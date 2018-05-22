import * as types from '../types/statsProjects'
import * as Rtypes from '../types/reset'

const initialState = {
    statsProjects:[]
}

const statsProjectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
            return {
                ...state,
            }
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
