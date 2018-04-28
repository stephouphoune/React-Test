import * as types from '../types/task'

const initialState = {
    tasks:[]
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
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
