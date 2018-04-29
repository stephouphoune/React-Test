import * as types from '../types/stats'
import store from '../createReduxStore'

const requestStats = () => ({
    type: types.REQUEST_GET_STATS
})

const receiveStats = (stats = []) => ({
    type: types.RECEIVE_GET_STATS,
    stats
})

export const getStats = dispatch => (project) => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestStats())
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/stats?projectId=${project.id}`, {
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
            const { stats } = data
            dispatch(receiveStats(stats))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveStats())
    })
}