import * as types from '../types/activity'

const initialState = {
    activities: []
}

const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_GET_ACTIVITIES:
        //Peut être penser à mettre une variable à true pour montrer
        //que c'est en train de charger
            return {
                ...state,
            }
        case types.RECEIVE_GET_ACTIVITIES:
            return {
                ...state,
                activities: action.activities
            }
        default:
            return state
    }
}

export default activityReducer
