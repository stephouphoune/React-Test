import * as types from '../types/activity'
import * as Rtypes from '../types/reset'

const initialState = {
    activities: []
}

const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
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
        case types.RECEIVE_DELETE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.filter(activity => {
                    if (activity.id === action.activityId) return false //on le garde pas
                    return true
                })
            }
        case types.RECEIVE_POST_ACTIVITY:
            return {
                ...state
            }
        default:
            return state
    }
}

export default activityReducer
