import * as types from '../types/label'

const initialState = {
    labels:[]
}

const labelReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_GET_LABELS:
        //Peut être penser à mettre une variable à true pour montrer
        //que c'est en train de charger
            return {
                ...state,
            }
        case types.RECEIVE_GET_LABELS:
            return {
                ...state,
                labels:action.labels
            }
        default:
            return state
    }
}

export default labelReducer
