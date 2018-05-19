import * as types from '../types/stats'
import * as Rtypes from '../types/reset'

const initialState = {
    stats:[]
}

const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
            return {
                ...state,
            }
        case types.RECEIVE_GET_STATS_TASKS:
        case types.RECEIVE_GET_STATS_PROJECTS:
            return {
                ...state,
                stats:action.stats
            }
        default:
            return state
    }
}

export default statsReducer
