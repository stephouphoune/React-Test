import * as types from '../types/statsCsv'
import * as Rtypes from '../types/reset'

const initialState = {
    statsCsv:[]
}

const statsCsvReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
            return {
                ...state,
            }
        case types.RECEIVE_GET_STATS_CSV:
            return {
                ...state,
                statsCsv:action.statsCsv
            }
        default:
            return state
    }
}

export default statsCsvReducer
