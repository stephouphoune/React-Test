const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')
const entityManager = require('../services/entityManager')
const asyncHandler = require('../services/asyncHandler')
const fetchIcal = require('../services/fetchIcal')
const executeQuery2 = require('../services/executeQuery2')

const createTask = rawTask => ({
  id: rawTask.task_id,
  name: rawTask.name,
  projectId: rawTask.project_id,
  description: rawTask.description,
  isDiverse: rawTask.isDiverse,
  isVisible: rawTask.isVisible
})

const createTasks = rawTasks => rawTasks.map(createTask)

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

const getActivityId = async(activityName) => {
  const rawRows = await executeQuery2(`SELECT activity_id FROM activity WHERE name='${activityName}'`)
  const activityId = JSON.parse(JSON.stringify(rawRows))
  console.log('ACTIVITYID',activityId)
  if (activityId.length===0)
    {
      rawRows = await executeQuery2(`INSERT INTO activity VALUES (NULL, '${activityName}', 0, 0`)
      rawRows2 = await executeQuery2(`SELECT activity_id FROM activity WHERE name='${activityName}'`)
    }
  return activityId
}

const getProjectId = async(projectName, activityId) => {
    const rawRows = await executeQuery2(`SELECT project_id FROM project WHERE name='${projectName}' AND activity_id='${activityId}'`)
    const projectId = JSON.parse(JSON.stringify(rawRows))
    if (projectId.length===0)
    {
      rawRows = await executeQuery2(`INSERT INTO project VALUES (NULL, '${projectName}', '${activityId}', 0, 0`)
      rawRows2 = await executeQuery2(`SELECT project_id FROM project WHERE name='${projectName}' AND activity_id='${activityId}'`)
      projectId = JSON.parse(JSON.stringify(rawRows2))
    }
    return projectId
}

const getTaskId = async(taskName, projectId) => {
    const rawRows = await executeQuery2(`SELECT task_id FROM task WHERE name='${taskName}' AND project_id='${projectId}'`)
    const taskId = JSON.parse(JSON.stringify(rawRows))
    if (taskId.length===0)
    {
      rawRows = await executeQuery2(`INSERT INTO task VALUES (NULL, '${taskName}', '', '${projectId}', 0, 0, 0`)
      taskId = JSON.parse(JSON.stringify(rawRows))
    }
    return taskId
}

const checkIsenId = async(isenId, taskId, activityName, projectName, taskName, description, startDate, endDate, username) => {
    const rawRows = await executeQuery2(`SELECT isen_id FROM event WHERE isen_id='${isenId}'`)
    const id = JSON.parse(JSON.stringify(rawRows))
    console.log('id', id)
    if (id.length===0)
    {
      //const duration = 
      await executeQuery2(`INSERT INTO event VALUES(NULL, '${description}', '0', '0', '${now.toMysqlFormat()}', '${now.toMysqlFormat()}', '${new Date(startDate).toMysqlFormat()}', '${new Date(endDate).toMysqlFormat()}', '${isenId}', '${activityName} - ${projectName} - ${taskName}', '${taskId}', '${req.user.username}', '${duration}')`)
    }
    else {
      const rawRows2 = await executeQuery2(`SELECT isModified FROM event WHERE isen_id='${isenId}`)
      const isModified = JSON.parse(JSON.stringify(rawRows2))
      if (isModified[0]===0)
      {
        //const duration = 
        await executeQuery2(`UPDATE event SET isModified='1', startDate='${startDate}', endDate='${endDate}, lastUpdateDate='${now.toMysqlFormat()}', name='${activityName} - ${projectName} - ${taskName}', duration='${duration}' WHERE isen_id='${isenId}' AND username='${username}'`)
      }
    }
}

// créer ou récuperer l'activityId qui correspond à event.activityName
    // créer ou récuperer le projectId qui correspond à event.projectName
    // créer ou récuperer le taskId qui correspond à event.taskName
    //lire isenId de event et regarder s'il n'existe pas dans la base
    // créer l'event si il existe pas 
    //sinon
    // si l'event avec l'isenId === event.isenId a pas isModified à true le mettre à jour (date surtout)
    // sinon on fait rien

router.get('/api/sync', asyncHandler(async(req, res) => {
  //const { timestamp } = req.params
  // select url from req.user
  const username=req.user.username
  const date1 = new Date()
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
        isenId: eventKey,
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
    //2018-05-22T11:30:00.000Z 2018-05-22T13:30:00.000Z
    console.log(new Date(rawEvent.start), new Date(rawEvent.end))
    return {
      isenId: eventKey,
      activityName,
      projectName,
      taskName,
      description:'',
      startDate: new Date(rawEvent.start),
      endDate: new Date(rawEvent.end)
    }
    
  })
  .filter(event => event !== null)
  const date2 = new Date()
  console.log(date2-date1)
  
  for (event of events) {
    //const activityId = getActivityId(event.activityName)
    //const projectId = getProjectId(event.projectName, activityId)
    //const taskId = getTaskId(event.taskName, projectId)
    //checkIsenId(event.isenId, taskId, event.activityName, event.projectName, event.taskName, event.description, event.startDate, event.endDate, username)
  }

  res.end()
}))

module.exports = router;