import * as types from '../types/admin'

const initialState = {
    username: null,
    firstName:null,
    lastName:null,
    url:null,
    signinError: false,
    signinLoading: false,
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADMIN_REQUEST_SIGNIN:
            return {
                ...state,
                signinLoading: true
            }
        case types.ADMIN_RECEIVE_SIGNIN:
            return {
                ...state,
                signinLoading: false,
                username: action.username,
                firstName:action.firstName,
                lastName:action.lastName,
                url:action.url,
                signinError: action.signinError,    
            }
        default:
            return state
    }
}

export default adminReducer
