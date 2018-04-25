import * as types from '../types/activity'

const initialState = {
    activities: []
}

const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_GET_ACTIVITIES:
            // la tu pourra passer une variable à true pour indiquer que ça charge,
            // pas besoin de s'en soucier pour l'instant mais c'est bien de prévoir l'action au cas ou :)
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
