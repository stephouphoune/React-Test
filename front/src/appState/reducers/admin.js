import * as types from '../types/admin'
import * as Rtypes from '../types/reset'

const initialState = {
    username: null,
    firstName:null,
    lastName:null,
    url:null,
    token:null,
    isAdmin:null,
    signinError: false,
    signinLoading: false,
}

export const getCurrentToken = state => {
	const adminToken = state.admin.token
	const userToken = state.user.token
	if (adminToken) return adminToken
	return userToken
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
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
                isAdmin:action.isAdmin,
                token:action.token,
                signinError: action.signinError,    
            }
        default:
            return state
    }
}

export default adminReducer
