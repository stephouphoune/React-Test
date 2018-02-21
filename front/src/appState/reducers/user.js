import * as types from '../types/user'

const initialState = {
    email: null,
    token: null,
    signinError: '',
    signinLoading: false,
    isAdmin: true
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
                email: action.email,
                token: action.token,
                signinError: action.signinError,    
            }

        default:
            return state
    }
}

export default userReducer
