import * as types from '../types/statsProjects'
import * as Rtypes from '../types/reset'
import * as Ptypes from '../types/fullPurge'

const initialState = {
    statsProjects:[]
}

const statsProjectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
        case Ptypes.FULL_PURGE:
            return initialState;
        case types.RECEIVE_GET_STATS_PROJECTS:
            return {
                ...state,
                statsProjects:action.statsProjects
            }
        default:
            return state
    }
}

export default statsProjectsReducer
