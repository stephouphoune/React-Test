import * as types from '../types/statsActivities'
import * as Rtypes from '../types/reset'
import * as Ptypes from '../types/fullPurge'

const initialState = {
    statsActivities:[]
}

const statsActivitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Ptypes.FULL_PURGE:
        case Rtypes.FORCE_RESET:
            return initialState;
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
