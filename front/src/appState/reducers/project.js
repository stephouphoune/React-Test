import * as types from '../types/project'
import * as Rtypes from '../types/reset'

const initialState = {
    projects:[]
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.REQUEST_GET_PROJECTS:
        //Peut être penser à mettre une variable à true pour montrer
        //que c'est en train de charger
            return {
                ...state,
            }
        case types.RECEIVE_GET_PROJECTS:
            return {
                ...state,
                projects:action.projects
            }
        default:
            return state
    }
}

export default projectReducer
