import * as types from '../types/advancement'
import store from '../createReduxStore'
import moment from 'moment'

const requestGetAdvancement = () => ({
    type: types.REQUEST_GET_ADVANCEMENT
})

const receiveGetAdvancement = (advancement) => ({
    type: types.RECEIVE_GET_ADVANCEMENT,
    advancement
})

export const getAdvancement = dispatch => (date = new Date()) => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestGetAdvancement())
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/advancement?date=${date.toISOString()}`, {
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
            //Pas besoin de try catch dans les promise même avec JSON.parse()
            
            const data=JSON.parse(body)
            const { advancement } = data
            dispatch(receiveGetAdvancement(advancement))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveGetAdvancement())
    })
}