const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')
const entityManager = require('../services/entityManager')
const asyncHandler = require('../services/asyncHandler')
const fetchIcal = require('../services/fetchIcal')
const executeQuery2 = require('../services/executeQuery2')
const moment = require('moment')

Date.prototype.toMysqlFormat = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

Date.prototype.toMysqlFormatDay = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate());
}

function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

const getEventDetailsFromDescription = description => {
  const lines = description.split('\n')
  if (lines.length < 3) return null;
  const activityLine = lines[0]
  const projectLine = lines[1]
  const taskLine = lines[2]
  
  const activityLines = activityLine.split(' - ')
  if (activityLines.length < 2) return null;
  const activityName = activityLines[activityLines.length - 1]
  
  const projectLines = projectLine.split(' - ')
  if (projectLines.length < 2) return null;
  const projectName = projectLines[projectLines.length - 1]
  
  const taskLines = taskLine.split(' - ')
  if (taskLines.length < 2) return null;
  const taskName = taskLines[taskLines.length - 1]
  
  return {
    activityName,
    projectName,
    taskName
  }
}

router.get('/api/sync', asyncHandler(async(req, res) => {
  //const { timestamp } = req.params
  // select url from req.user

  const date1 = new Date()

  const username=req.user.username
  const rowUrl = await executeQuery2(`SELECT url_calendar FROM user WHERE username='${username}'`)
  const url = (JSON.parse(JSON.stringify(rowUrl)).map(url => url.url_calendar))[0]
  console.log(url)
  const ical = await fetchIcal(url)
  const icalKeys = Object.keys(ical)
  const eventKeys = icalKeys.filter(icalKey => icalKey.indexOf('Aurion-') === 0)
  console.log("Avant")

  const events = eventKeys.map(eventKey => {
    const rawEvent = ical[eventKey]
    const description = getEventDetailsFromDescription(rawEvent.description)
    if (!rawEvent)
    {
      console.log(rawEvent)
      return null
    }
    if (!rawEvent.start)
    {
      console.log(rawEvent.start)
      return null
    }
    if (!rawEvent.end)
    {
      console.log(rawEvent.end)
      return null
    }
      
    if (!rawEvent.description)
      return null
    
    if (!description)
    {
      console.log(rawEvent.description)
      return {
        isenId: eventKey.replace('Aurion-', ''),
        activityName: 'Inconnue',
        projectName: 'Inconnu',
        taskName: 'Inconnue',
        description: rawEvent.description,
        startDate: new Date(rawEvent.start),
        endDate: new Date(rawEvent.end)
      }
    }
    const activityName = description.activityName
    const projectName = description.projectName
    const taskName = description.taskName

    return {
      isenId: eventKey.replace('Aurion-', ''),
      activityName,
      projectName,
      taskName,
      description:'',
      startDate: new Date(rawEvent.start),
      endDate: new Date(rawEvent.end)
    }
    
  })
  .filter(event => event !== null)
  
  for (event of events) {
    const now = moment()
    //VERIFICATION DE LA JOURNEE EN COURS POUR LA SYNCHRONISATION
    
    const storedEvent = await getCurrentEvent(event, username)

    if (!storedEvent) {
      await createEvent(event, username)
      continue
    }
    if (!storedEvent.isModified) {
      await updateEvent(event, username)
      continue
    }
  }

  const date2 = new Date()
  console.log(date2-date1)
  res.end()
}))

const getCurrentEvent = async(event, username) => {
  const rawRows = await executeQuery2(`SELECT * FROM event WHERE isen_id='${event.isenId}' AND username='${username}' AND isDeleted='0'`)
  const currentEvent = JSON.parse(JSON.stringify(rawRows))
  return currentEvent[0]
}

const createEvent = async(event, username) => {
  let activityId = await getActivityId(event.activityName)
  if (activityId === -1)
    activityId = await createActivity(event.activityName)

  let projectId = await getProjectId(event.projectName, activityId)
  if (projectId === -1)
    projectId = await createProject(event.projectName, activityId)

  let taskId = await getTaskId(event.taskName, projectId)
  if (taskId === -1)
    taskId = await createTask(event.taskName, projectId)
  

  const now = moment()
  const startDate = moment(new Date(event.startDate).toMysqlFormat())
  const endDate = moment(new Date(event.endDate).toMysqlFormat())
  const duration = endDate.diff(startDate, "minutes")

  await executeQuery2(`INSERT INTO event VALUES(NULL, '${event.description.replace("\'", "\\\'")}', '0', '0', '${now.format('YYYY-MM-DD HH:mm:ss')}', '${now.format('YYYY-MM-DD HH:mm:ss')}', '${new Date(event.startDate).toMysqlFormat()}', '${new Date(event.endDate).toMysqlFormat()}', '${event.isenId}', '${event.activityName.replace("\'", "\\\'")} - ${event.projectName.replace("\'", "\\\'")} - ${event.taskName.replace("\'", "\\\'")}', '${taskId}', '${username}', '${duration}')`)
}

const updateEvent = async(event, username) => {
  const now = moment()
  const startDate = moment(new Date(event.startDate).toMysqlFormat())
  const endDate = moment(new Date(event.endDate).toMysqlFormat())
  const duration = endDate.diff(startDate, "minutes")
  await executeQuery2(`UPDATE event SET startDate='${new Date(event.startDate).toMysqlFormat()}', endDate='${new Date(event.endDate).toMysqlFormat()}', lastUpdateDate='${now.format('YYYY-MM-DD HH:mm:ss')}', name='${event.activityName.replace("\'", "\\\'")} - ${event.projectName.replace("\'", "\\\'")} - ${event.taskName.replace("\'", "\\\'")}', description='${event.description.replace("\'", "\\\'")}', duration='${duration}' WHERE isen_id='${event.isenId}' AND username='${username}'`)
}

const createActivity = async(activityName) => {
  const rows = await executeQuery2(`INSERT INTO activity VALUES (NULL, '${activityName.replace("\'", "\\\'")}', 0, 0)`)
  return rows.insertId
}

const createProject = async(projectName, activityId) => {
  const rows = await executeQuery2(`INSERT INTO project VALUES (NULL, '${projectName.replace("\'", "\\\'")}', '${activityId}', 0, 0)`)
  return rows.insertId
}

const createTask = async(taskName, projectId) => {
  const rows = await executeQuery2(`INSERT INTO task VALUES (NULL, '${taskName.replace("\'", "\\\'")}', '', '${projectId}', 0, 0, 0)`)
  return rows.insertId
}

const getTaskId = async(taskName, projectId) => {
  const rows = await executeQuery2(`SELECT task_id FROM task WHERE name='${taskName.replace("\'", "\\\'")}' AND project_id='${projectId}' AND isDeleted='0'`)
  const taskId = JSON.parse(JSON.stringify(rows)).map(task => task.task_id)
  return taskId[0] || -1
}

const getProjectId = async(projectName, activityId) => {
  const rows = await executeQuery2(`SELECT project_id FROM project WHERE name='${projectName.replace("\'", "\\\'")}' AND activity_id='${activityId}' AND isDeleted='0'`)
  const projectId = JSON.parse(JSON.stringify(rows)).map(project => project.project_id)
  return projectId[0] || -1
}

const getActivityId = async(activityName) => {
  const rows = await executeQuery2(`SELECT activity_id FROM activity WHERE name='${activityName.replace("\'", "\\\'")}' AND isDeleted='0'`)
  const activityId = JSON.parse(JSON.stringify(rows)).map(activity => activity.activity_id)
  return activityId[0] || -1
}


module.exports = router;