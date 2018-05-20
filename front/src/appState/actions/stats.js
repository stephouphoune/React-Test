import * as types from '../types/stats'
import store from '../createReduxStore'

const receiveStatsTasks = (stats = []) => ({
    type: types.RECEIVE_GET_STATS_TASKS,
    stats
})

const receiveStatsProjects = (stats =[]) => ({
    type: types.RECEIVE_GET_STATS_PROJECTS,
    stats
})

export const getStatsTasks = dispatch => (project) => {
    //dispatch = envoi/utilisation de la méthode en argument
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/statsTasks?projectId=${project.id}`, {
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
            
            dispatch(receiveStatsTasks(stats))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveStatsTasks())
    })
}

export const getStatsProjects = dispatch => (activity) => {
    //dispatch = envoi/utilisation de la méthode en argument
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/statsProjects?activityId=${activity.id}`, {
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
            console.log(data)
            dispatch(receiveStatsProjects(stats))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveStatsProjects())
    })
}
