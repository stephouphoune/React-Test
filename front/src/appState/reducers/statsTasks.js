import * as types from '../types/statsTasks'
import * as Rtypes from '../types/reset'

const initialState = {
    statsTasks:[]
}

const statsTasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
            return {
                ...state,
            }
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
