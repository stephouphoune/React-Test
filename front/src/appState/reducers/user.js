import * as types from '../types/user'

const initialState = {
    username: null,
    firstName:null,
    lastName:null,
    token: null,
    signinError: false,
    signinLoading: false,
    isAdmin: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_REQUEST_SIGNIN:
            return {
                ...state,
                signinLoading: true
            }
        case types.USER_RECEIVE_SIGNIN:
            return {
                ...state,
                signinLoading: false,
                username: action.username,
                firstName:action.firstName,
                lastName:action.lastName,
                token: action.token,
                isAdmin:action.isAdmin,
                signinError: action.signinError,    
            }

        default:
            return state
    }
}

export default userReducer
