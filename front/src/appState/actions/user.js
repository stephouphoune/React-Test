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
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestSignIn())

    //Un fetch se décompose en header/body/footer si on le souhaite. 
    fetch(`http://localhost:3001/api/user?email=${email}&password=${password}`, {
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
        dispatch(receiveSignIn(email, token))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveSignIn(null, null, 'Identifiant incorrect!'))
    })
    
}

