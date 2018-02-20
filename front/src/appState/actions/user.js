import * as types from '../types/user'

const requestSignIn = () => ({
    type: types.USER_REQUEST_SIGNIN
})

const receiveSignIn = (email, token, signinError) => ({
    type: types.USER_RECEIVE_SIGNIN,
    email,
    token,
    signinError
})

export const createSignIn = dispatch => (email, password) => {

    dispatch(requestSignIn())

    fetch(`http://localhost:3001/api/user?email=${email}&password=${password}`, {
        method: 'GET',
    })
    .then(response => {
        if (response.status !== 200) {
            throw Error('')
        }
        return response.text()
    })
    .then(body => {
        const token = body
        dispatch(receiveSignIn(email, token))
    }).catch(() => {
        dispatch(receiveSignIn(null, null, 'Identifiant incorrect!'))
    })

}

