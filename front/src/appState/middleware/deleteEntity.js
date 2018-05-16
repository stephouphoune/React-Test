import * as activityTypes from '../types/activity'
import * as projectTypes from '../types/project'
import * as taskTypes from '../types/task'

import { deleteProjects } from '../actions/project'
import { deleteTasks } from '../actions/task'
import { deleteEvents } from '../actions/event'

const filterActionTypes = [
  activityTypes.RECEIVE_DELETE_ACTIVITY,
  projectTypes.RECEIVE_DELETE_PROJECT,
  taskTypes.RECEIVE_DELETE_TASK
]

// next = dispatch (mais repasse pas dans le middleware)
export default store => next => action => {

  // on laisse passer toute les actions
  next(action)

  // si c'est pas une action qui supprime quelque chose ont fait rien
  if (filterActionTypes.indexOf(action.type) === -1) return;

  // on recupere le state
  const state = store.getState()
  let projectIds = null;
  let taskIds = null;
  let eventIds = null

  // si on viens de supprimer une activité
  if (action.type === activityTypes.RECEIVE_DELETE_ACTIVITY) {

    // on prend les ids des projets qui corresponde à l'activité
    projectIds = state.project.projects
      .filter(project => project.activityId === action.activityId)
      .map(project => project.id)

    // on prend les ids des taches qui correspondent aux projet plus hait
    taskIds = state.task.tasks
      .filter(task => projectIds.indexOf(task.projectId) !== -1)
      .map(task => task.id)

    eventIds = state.event.events
      .filter(event => taskIds.indexOf(event.taskId) !== -1)
      .map(event => event.id)
  
  }

  if (action.type === projectTypes.RECEIVE_DELETE_PROJECT) {


    taskIds = state.task.tasks
      .filter(task => task.projectId === action.projectId)
      .map(task => task.id)

    eventIds = state.event.events
      .filter(event => taskIds.indexOf(event.taskId) !== -1)
      .map(event => event.id)
  
  }

  if (action.type ===taskTypes.RECEIVE_DELETE_TASK) {

    eventIds = state.event.events
      .filter(event => action.taskId === event.taskId)
      .map(event => event.id)
  
  }

  // on envoie des actions dans les reducers
  if (projectIds) next(deleteProjects(projectIds))
  if (taskIds) next(deleteTasks(taskIds))
  if (eventIds) next(deleteEvents(eventIds))

}