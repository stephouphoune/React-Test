import * as types from '../types/statsActivities'
import * as Rtypes from '../types/reset'

const initialState = {
    statsActivities:[]
}

const statsActivitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
            return {
                ...state,
            }
        case types.RECEIVE_GET_STATS_ACTIVITIES:
            return {
                ...state,
                statsActivities:action.statsActivities
            }
        default:
            return state
    }
}

export default statsActivitiesReducer
