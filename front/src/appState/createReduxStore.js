import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './reducers/user'
import taskReducer from './reducers/task'
import activityReducer from './reducers/activity'
import projectReducer from './reducers/project'
import labelReducer from './reducers/label'
import usersReducer from './reducers/users'
import workdayReducer from './reducers/workday'
import eventReducer from './reducers/event'
import statsReducer from './reducers/stats'

import deleteEntityMiddleware from './middleware/deleteEntity'
import setVisibilityEntity from './middleware/setVisibilityEntity'

const persistConfig = {
    key: 'root',
    storage
}

const store = createStore(
    combineReducers({
        user: persistReducer(persistConfig, userReducer),
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
        applyMiddleware(deleteEntityMiddleware),
        applyMiddleware(setVisibilityEntity),
        applyMiddleware(createLogger())
    )
)

persistStore(store)

export default store