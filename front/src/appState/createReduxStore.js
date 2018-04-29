import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import userReducer from './reducers/user'
import taskReducer from './reducers/task'
import activityReducer from './reducers/activity'
import projectReducer from './reducers/project'
import labelReducer from './reducers/label'
import usersReducer from './reducers/users'
import workdayReducer from './reducers/workday'
import eventReducer from './reducers/event'
import statsReducer from './reducers/stats'

const store = createStore(
    combineReducers({
        user: userReducer,
        project:projectReducer,
        activity:activityReducer,
        task:taskReducer,
        label:labelReducer, 
        users:usersReducer,
        workday:workdayReducer,
        event:eventReducer,
        stats:statsReducer,
    }),
    compose(
        applyMiddleware(createLogger())
    )
)

export default store