import * as types from '../types/user'

const initialState = {
    email: null,
    token: null,
    isSignIn: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_REQUEST_SIGNIN:
            return {
                ...state,
                email: action.email,
                isSignIn: true
            }
        default:
            return state
    }
}

export default userReducer
