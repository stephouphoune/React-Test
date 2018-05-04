import * as types from '../types/stats'
import * as Rtypes from '../types/reset'

const initialState = {
    stats:[]
}

const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.REQUEST_GET_STATS:
        //Peut être penser à mettre une variable à true pour montrer
        //que c'est en train de charger
            return {
                ...state,
            }
        case types.RECEIVE_GET_STATS:
            return {
                ...state,
                stats:action.stats
            }
        default:
            return state
    }
}

export default statsReducer
