import * as types from '../types/activity'
import store from '../createReduxStore'

const requestGetActivity = () => ({
    type: types.REQUEST_GET_ACTIVITIES
})

const receiveGetActivity = (activities = []) => ({
    type: types.RECEIVE_GET_ACTIVITIES,
    activities
})

const receivePostActivity = (activity) => ({
    type: types.RECEIVE_POST_ACTIVITY,
    activities: [activity]
})

const receiveDeleteActivity = (activityId) => ({
    type: types.RECEIVE_DELETE_ACTIVITY,
    activityId
})

const receiveModifyActivity = (activity) => ({
    type: types.RECEIVE_MODIFY_ACTIVITY,
    activities:[activity]
})


export const requestGetActivities = dispatch => () => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestGetActivity())
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/activity`, {
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
            //Pas besoin de try catch dans les promise même avec JSON.parse()
            const data=JSON.parse(body)
            const { activities } = data
            dispatch(receiveGetActivity(activities))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveGetActivity())
    })
}

export const postActivity = dispatch => ({name}) => {
    const data = {
        name
    }
    fetch(`http://localhost:3001/api/activity`, {
        method: 'POST',
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
            //Pas besoin de try catch dans les promise même avec JSON.parse()
            const data=JSON.parse(body)
            console.log('-----------', data)
            const { activity } = data
            dispatch(receivePostActivity(activity))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receivePostActivity())
    })
}

export const deleteActivity = dispatch => (activityId) => {
    fetch(`http://localhost:3001/api/activity/${activityId}`, {
        method: 'DELETE',
        headers: {
            'X-AUTH-TOKEN': store.getState().user.token,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status !== 200) {
            throw Error('')
        }
        return response.text()
        console.log(response)
    })
    .then(body => {
        dispatch(receiveDeleteActivity(activityId))
    })
    .catch(() => {
        dispatch(receiveDeleteActivity())
    })
}

export const modifyActivity = dispatch => ({name, activityId}) => {

    const data = {
        name, 
        activityId
    }

    fetch(`http://localhost:3001/api/activity/${activityId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-AUTH-TOKEN': store.getState().user.token,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status !== 200) {
            throw Error('')
        }
        return response.text()
    })
    .then(body => {
        const data = JSON.parse(body)
        const { activity } = data
        dispatch(receiveModifyActivity(activity))
    })
    .catch(() => {
        dispatch(receiveModifyActivity())
    })
}