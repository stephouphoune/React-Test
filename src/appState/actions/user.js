import * as types from '../types/user'

export const requestSignIn = (email, password) => ({
    type: types.USER_REQUEST_SIGNIN,
    email,
    password
})
