import { getEvents } from '../actions/event'
import { requestGetTasks } from '../actions/task'
import { requestGetProjects } from '../actions/project'
import { requestGetActivities } from '../actions/activity'

export const fullReload = dispatch => (date) => {
    requestGetActivities(dispatch)()
    requestGetTasks(dispatch)()
    requestGetProjects(dispatch)()
    getEvents(dispatch)(date.toDate())
 }