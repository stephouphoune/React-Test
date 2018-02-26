import * as types from '../types/user'

const requestSignIn = () => ({
    type: types.USER_REQUEST_SIGNIN
})

const receiveSignIn = (username, token, signinError) => ({
    type: types.USER_RECEIVE_SIGNIN,
    username,
    token,
    signinError
})

export const createSignIn = dispatch => (username, password) => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestSignIn())

    //Un fetch se décompose en header/body/footer si on le souhaite. 
    fetch(`http://localhost:3001/api/user?username=${username}&password=${password}`, {
        method: 'GET',
    })
    //Résultats du fetch
    .then(response => {
        //Résultat reponse : par défaut cela va dans le <header>
        if (response.status !== 200) {
            throw Error('')
        }
        //Permet de traduire la réponse en format texte pour que body puisse lire
        return response.text()
    })
    //Résultat <body>
    .then(body => {
        const token = body
        dispatch(receiveSignIn(username, token))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveSignIn(null, null, 'Identifiant incorrect!'))
    })
    
}

