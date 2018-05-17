import * as types from '../types/task'
import * as Rtypes from '../types/reset'

const initialState = {
    tasks:[]
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.DELETE_TASKS:
            return {
                ...state,
                tasks: state.tasks.filter(({ id }) => 
                    action.taskIds.indexOf(id) === -1
                )
            }
        case types.RECEIVE_DELETE_TASK:
        case types.RECEIVE_VISIBILITY_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.id === action.taskId) 
                        return {
                            ...task,
                            isVisible:action.isVisible
                        }
                    return task
                })
            }
        case types.RECEIVE_POST_TASK:
        case types.RECEIVE_MODIFY_TASK:
        case types.RECEIVE_GET_TASKS:
            return {
                ...state, 
                tasks: action.tasks.reduce((newTasks, task) => {
                    if (!task) return newTasks;

                    const existingTaskIndex = newTasks.findIndex(item => item.id === task.id)
                    if (existingTaskIndex === -1) { // si il est pas dedans
                        return [...newTasks, task] // on l'ajoute
                    }
                    const tasks = [...newTasks]
                    tasks[existingTaskIndex] = task;
                    return tasks;

                }, state.tasks)
            }
        default:
            return state
    }
}

export default taskReducer
