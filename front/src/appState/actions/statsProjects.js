import * as types from '../types/statsProjects'
import store from '../createReduxStore'
import { getCurrentToken } from '../reducers/admin'
const receiveStatsProjects = (statsProjects =[]) => ({
    type: types.RECEIVE_GET_STATS_PROJECTS,
    statsProjects
})

export const getStatsProjects = dispatch => (activity) => {
    //dispatch = envoi/utilisation de la méthode en argument
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/statsProjects?activityId=${activity.id}`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': getCurrentToken(store.getState()),
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
            const statsProjects = JSON.parse(body)
            console.log(statsProjects)
            dispatch(receiveStatsProjects(statsProjects))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveStatsProjects())
    })
}