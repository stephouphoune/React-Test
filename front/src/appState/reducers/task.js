import * as types from '../types/task'
import * as Rtypes from '../types/reset'

const initialState = {
    tasks:[]
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.REQUEST_GET_TASKS:
        //Peut être penser à mettre une variable à true pour montrer
        //que c'est en train de charger
            return {
                ...state,
            }
        case types.RECEIVE_GET_TASKS:
            return {
                ...state,
                tasks:action.tasks
            }
        default:
            return state
    }
}

export default taskReducer
