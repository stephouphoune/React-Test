import * as types from '../types/task'
import * as Rtypes from '../types/reset'

const initialState = {
    tasks:[]
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.RECEIVE_DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => {
                    if (task.id === action.taskId) return false //on le garde pas
                    return true
                })
            }
        case types.RECEIVE_POST_TASK:
        case types.RECEIVE_MODIFY_TASK:
        case types.RECEIVE_GET_TASKS:
            return {
                ...state, 
                tasks: action.tasks.reduce((newActivities, task) => {
                    if (!task) return newActivities;

                    const existingTaskIndex = newActivities.findIndex(item => item.id === task.id)
                    if (existingTaskIndex === -1) { // si il est pas dedans
                        return [...newActivities, task] // on l'ajoute
                    }
                    const tasks = [...newActivities]
                    tasks[existingTaskIndex] = task;
                    return tasks;

                }, state.tasks)
            }
        default:
            return state
    }
}

export default taskReducer
