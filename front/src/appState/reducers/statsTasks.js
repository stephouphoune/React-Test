import * as types from '../types/statsTasks'
import * as Rtypes from '../types/reset'
import * as Ptypes from '../types/fullPurge'

const initialState = {
    statsTasks:[]
}

const statsTasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case Ptypes.FULL_PURGE:
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.RECEIVE_GET_STATS_TASKS:
            return {
                ...state,
                statsTasks:action.statsTasks
            }
        default:
            return state
    }
}

export default statsTasksReducer
