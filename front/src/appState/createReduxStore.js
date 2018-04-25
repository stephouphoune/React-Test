import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/user'
import taskReducer from './reducers/task'
import activityReducer from './reducers/activity'
import projectReducer from './reducers/project'
import labelReducer from './reducers/label'


export default () => {
    const store = createStore(
        combineReducers({
            user: userReducer,
            project:projectReducer,
            activity:activityReducer,
            task:taskReducer,
            label:labelReducer
        })
    )
    return store
}