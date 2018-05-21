const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')
const entityManager = require('../services/entityManager')
const asyncHandler = require('../services/asyncHandler')

const createTask = rawTask => ({
  id: rawTask.task_id,
  name: rawTask.name,
  description: rawTask.description,
  projectId: rawTask.project_id,
  isDiverse: rawTask.isDiverse,
  isVisible: rawTask.isVisible
})

const createTasks = rawTasks => rawTasks.map(createTask)

router.get('/api/sync/:timestamp', asyncHandler(async(req, res) => {
  const { timestamp } = req.params
  
  // select url from req.user
  const ical = await fetchIcal(url)

  const icalKeys = Object.keys(ical)
  const eventKeys = icalKeys.filter(icalKey => icalKey.indexOf('Aurion-') === 0)
  const events = eventKeys.map(eventKey => {
    const rawEvent = ical[eventKey]
    const matchs = /- ([^\\n]*)/gm.exec(rawEvent.description)
    if (matchs.length < 3) {
      return null;
    }
    return {
      isenId: eventKey,
      activityName: matchs[0],
      projectName: matchs[1],
      taskName: matchs[2],
      startDate: new Date(rawEvent.start),
      endDate: new Date(rawEvent.end)
    }
  })
  .filter(event => event !== null)

  for (event of events) {
    // créer ou récuperer l'activityId qui correspond à event.activityName
    // créer ou récuperer le projectId qui correspond à event.projectName
    // créer ou récuperer le taskId qui correspond à event.taskName
    // créer l'event si il existe pas sinon
    // si l'event avec l'isenId === event.isenId a pas isModified à true le mettre à jour
    // sinon on fait rien
  }

  res.end()
}))

module.exports = router;