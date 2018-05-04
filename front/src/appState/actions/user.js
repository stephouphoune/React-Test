import * as types from '../types/user'

const requestSignIn = () => ({
    type: types.USER_REQUEST_SIGNIN
})

export const receiveSignIn = (username, firstName, lastName, token, isAdmin, signinError) => ({
    type: types.USER_RECEIVE_SIGNIN,
    username,
    token,
    isAdmin,
    signinError,
    firstName, 
    lastName,
})

export const createSignIn = dispatch => (username, password) => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestSignIn())

    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
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
        try{
            body=JSON.parse(body)
            dispatch(receiveSignIn(username, body.firstName, body.lastName, body.token, body.isAdmin, false))
        }
        catch(e)
        {
            return;
        }
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveSignIn(null, null, true))
    })
}

