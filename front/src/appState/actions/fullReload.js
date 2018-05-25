import { getEvents } from '../actions/event'
import { requestGetTasks } from '../actions/task'
import { requestGetProjects } from '../actions/project'
import { requestGetActivities } from '../actions/activity'
import { getStatsActivities } from '../actions/statsActivities'
import { getStatsCsv } from '../actions/statsCsv'

export const fullReload = dispatch => (date) => {
    requestGetActivities(dispatch)()
    requestGetTasks(dispatch)()
    requestGetProjects(dispatch)()
    getEvents(dispatch)(date.toDate())
    getStatsActivities(dispatch)()
 }