import * as types from '../types/workday'

const initialState = {
    workdays:[]
}

const workdayReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_GET_WORKDAYS:
        //Peut être penser à mettre une variable à true pour montrer
        //que c'est en train de charger
            return {
                ...state,
            }
        case types.RECEIVE_GET_WORKDAYS:
            return {
                ...state,
                workdays:action.workdays
            }
        default:
            return state
    }
}

export default workdayReducer
