const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')
const entityManager = require('../services/entityManager')
const asyncHandler = require('../services/asyncHandler')
const fetchIcal = require('../services/fetchIcal')
const executeQuery2 = require('../services/executeQuery2')


Date.prototype.toMysqlFormat = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

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
  const ical = await fetchIcal(req.query.url)
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
    await getCurrentEvent(event, username)
    

  }

  const date2 = new Date()
  console.log(date2-date1)
  res.end()
}))

const getCurrentEvent = async(event, username) => {
  const rawRows = await executeQuery2(`SELECT * FROM event WHERE isen_id='${event.isenId}'`)
  const currentEvent = JSON.parse(JSON.stringify(rawRows))
  if (currentEvent.length === 0)
  {
    await createEvent(event, username)
    return
  }
  const isModifiedEvent = currentEvent.map(event => event.isModified)
  if (isModifiedEvent[0] === 0)
  {
    //updateEvent(event, username)
    return
  }
}

const createEvent = async(event, username) => {
  let activityId = await getActivityId(event.activityName)
  if (activityId.length === 0)
    await createActivity(event.activityName)
  activityId = await getActivityId(event.activityName)

  let projectId = await getProjectId(event.projectName, activityId)
  if (projectId.length === 0)
    await createProject(event.projectName, activityId)
  projectId = await getProjectId(event.projectName, activityId)

  let taskId = await getTaskId(event.taskName, projectId)
  if (taskId.length === 0)
    await createTask(event.taskName, projectId)
  taskId = await getTaskId(event.taskName, projectId)
  //Créer evenement 
  //const duration = 
  //await executeQuery2(`INSERT INTO event VALUES(NULL, '${event.description}', '0', '0', '${now.toMysqlFormat()}', '${now.toMysqlFormat()}', '${new Date(startDate).toMysqlFormat()}', '${new Date(endDate).toMysqlFormat()}', '${isenId}', '${activityName} - ${projectName} - ${taskName}', '${taskId}', '${req.user.username}', '${duration}')`)
}

const updateEvent = async(event, username) => {
  //const duration = 
  await executeQuery2(`UPDATE event SET isModified='1', startDate='${event.startDate}', endDate='${event.endDate}, lastUpdateDate='${now.toMysqlFormat()}', name='${event.activityName} - ${event.projectName} - ${event.taskName}', duration='${duration}' WHERE isen_id='${event.isenId}' AND username='${username}'`)
}

const createActivity = async(activityName) => {
  await executeQuery2(`INSERT INTO activity VALUES (NULL, '${activityName}', 0, 0)`)
}

const createProject = async(projectName, activityId) => {
  await executeQuery2(`INSERT INTO project VALUES (NULL, '${projectName}', '${activityId}', 0, 0)`)
}

const createTask = async(taskName, projectId) => {
  await executeQuery2(`INSERT INTO task VALUES (NULL, '${taskName}', '', '${projectId}', 0, 0, 0)`)
}

const getTaskId = async(taskName, projectId) => {
  const rows = await executeQuery2(`SELECT task_id FROM task WHERE name='${taskName}' AND project_id='${projectId}'`)
  const taskId = JSON.parse(JSON.stringify(rows))
  return taskId
}

const getProjectId = async(projectName, activityId) => {
  const rows = await executeQuery2(`SELECT project_id FROM project WHERE name='${projectName}' AND activity_id='${activityId}'`)
  const projectId = JSON.parse(JSON.stringify(rows))
  return projectId
}

const getActivityId = async(activityName) => {
  const rows = await executeQuery2(`SELECT activity_id FROM activity WHERE name='${activityName}'`)
  const activityId = JSON.parse(JSON.stringify(rows))
  return activityId
}

module.exports = router;