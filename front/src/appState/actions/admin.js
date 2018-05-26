import * as types from '../types/admin'
import store from '../createReduxStore'
import { getCurrentToken } from '../reducers/admin'
import { fullPurge } from './fullPurge'
import { fullReload } from './fullReload';
import { forceReset } from './reset'
import { message } from 'antd'

const requestSignIn = () => ({
    type: types.ADMIN_REQUEST_SIGNIN
})

export const receiveSignIn = (username, firstName, lastName, token, url, isAdmin, signinError) => ({
    type: types.ADMIN_RECEIVE_SIGNIN,
    username,
    firstName, 
    lastName,
    token,
    url,
    isAdmin,
    signinError,
})

export const connectionAdmin = dispatch => (username, date) => {

    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestSignIn())

    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/admin?username=${username}`, {
        method: 'GET',
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
            dispatch(receiveSignIn(username, data.firstName, data.lastName, data.token, data.url, data.isAdmin, false))
            dispatch(fullPurge())
            fullReload(dispatch)(date)
            message.success(`Vous êtes connecté au compte de ${data.firstName} ${data.lastName}`)
            
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveSignIn(null, null, null, null, null, null,true))
    })
}

export const deconnectionAdmin = dispatch => (date) => {
    dispatch(forceReset())
    fullReload(dispatch)(date)
}