import * as types from '../types/user'
import store from '../createReduxStore'

const requestSignIn = () => ({
    type: types.USER_REQUEST_SIGNIN
})

const receiveModifyUrl = (url) => ({
    type: types.RECEIVE_URL_CALENDAR,
    url
})

export const receiveSignIn = (username, firstName, lastName, url, token, isAdmin, signinError) => ({
    type: types.USER_RECEIVE_SIGNIN,
    username,
    firstName, 
    lastName,
    url,
    token,
    isAdmin,
    signinError,
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
            dispatch(receiveSignIn(username, body.firstName, body.lastName, body.url, body.token, body.isAdmin, false))
        }
        catch(e)
        {
            return;
        }
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveSignIn(null, null, null, null, null, null, true))
    })
}

export const modifyUrlCalendar = dispatch => (url) => {
    const data = {
        url
    }
    fetch(`http://localhost:3001/api/user`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-AUTH-TOKEN': store.getState().user.token,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
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
            const data = JSON.parse(body)
            dispatch(receiveModifyUrl(data.url))
    }).catch(() => {
        dispatch(receiveModifyUrl())
    })
}

