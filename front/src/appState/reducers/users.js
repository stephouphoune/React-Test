import * as types from '../types/users'
import * as Rtypes from '../types/reset'

const initialState = {
    users:[]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.REQUEST_GET_USERS:
        //Peut être penser à mettre une variable à true pour montrer
        //que c'est en train de charger
            return {
                ...state,
            }
        case types.RECEIVE_GET_USERS:
            return {
                ...state,
                users:action.users
            }
        default:
            return state
    }
}

export default usersReducer