import * as activityTypes from '../types/activity'
import * as projectTypes from '../types/project'
import * as taskTypes from '../types/task'

import { setVisibilityProjects } from '../actions/project'
import { setVisibilityTasks } from '../actions/task'

const filterActionTypes = [
  activityTypes.RECEIVE_VISIBILITY_ACTIVITY,
  projectTypes.RECEIVE_VISIBILITY_PROJECT,
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

  // si on viens de supprimer une activité
  if (action.type === activityTypes.RECEIVE_VISIBILITY_ACTIVITY) {

    // on prend les ids des projets qui corresponde à l'activité
    projectIds = state.project.projects
      .filter(project => project.activityId === action.activityId)
      .map(project => project.id)

    // on prend les ids des taches qui correspondent aux projet plus hait
    taskIds = state.task.tasks
      .filter(task => projectIds.indexOf(task.projectId) !== -1)
      .map(task => task.id)

  }

  if (action.type === projectTypes.RECEIVE_VISIBILITY_PROJECT) {

    taskIds = state.task.tasks
      .filter(task => task.projectId === action.projectId)
      .map(task => task.id)
  
  }

  // on envoie des actions dans les reducers
  if (projectIds) next(setVisibilityProjects(projectIds))
  if (taskIds) next(setVisibilityTasks(taskIds))
}