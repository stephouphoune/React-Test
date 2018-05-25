import * as types from '../types/event'
import store from '../createReduxStore'
import { notification } from 'antd'
import moment from 'moment'
import { fullReload } from './fullReload';
import { receiveSignIn } from '../actions/user'
import { forceReset } from '../actions/reset'
import { getCurrentToken } from '../reducers/admin'
import { fullPurge } from '../actions/fullPurge'

const requestPostEvent = () => ({
    type: types.REQUEST_POST_EVENT
})

const receivePostEvent = (event) => ({
    type: types.RECEIVE_POST_EVENT,
    events: [event]
})

const requestGetEvents = () => ({
    type: types.REQUEST_GET_EVENTS
})

const receiveGetEvents = (events = []) => ({
    type: types.RECEIVE_GET_EVENTS,
    events
})

const requestDeleteEvent = () => ({
    type: types.REQUEST_DELETE_EVENT
})

const receiveDeleteEvent = (eventId) => ({
    type: types.RECEIVE_DELETE_EVENT,
    eventId
})

const requestModifyEvent = () => ({
    type: types.REQUEST_MODIFY_EVENT
})

const receiveModifyEvent = (event) => ({
    type: types.RECEIVE_MODIFY_EVENT,
    events:[event]
})

const receiveGetSyncEvents = () => ({
    type: types.RECEIVE_GET_SYNC_EVENTS,
})

export const deleteEvents = (eventIds) => ({
    type: types.DELETE_EVENTS,
    eventIds
})

export const getSyncEvents = dispatch => (date) => {
    notification['info']({
        placement: "bottomLeft",
        duration: 0,
        message: 'Synchronisation en cours, veuillez patienter...',
        description:'Information Task-Eat',
        style:{
            textAlign:'left'
        },
        key:1
    });
    fetch(`http://localhost:3001/api/sync`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': getCurrentToken(store.getState()),
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
        //const data = JSON.parse(body)
        //const {events} = data
        notification.close(1)
        dispatch(receiveGetSyncEvents())
        fullReload(dispatch)(date)
    }).catch(() => {
        dispatch(receiveGetSyncEvents())
        notification.close(1)
        notification['info']({
            placement: "bottomLeft",
            duration: 5,
            message: 'La synchronisation de votre agenda n\'a pas pu être effectuée, veuillez vérifier l\'adresse enregistrée',
            description:'Information Task-Eat',
            style:{
                textAlign:'left'
            },
            key:2
        })
    })
}

export const postEvent = dispatch => ({ activity, project, task, description, duration, date }) => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestPostEvent())
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    //const noon = moment().hour(12).minute(0).second(0).toDate()
    //const endDate = moment().hour(12).minute(0).second(0).add(duration, 'minutes').toDate()
    const timestamp = moment().format('X')
    date = date.format('X')

    const data = {
        taskId: task.id,
        description,
        name: `${activity.name} - ${project.name} - ${task.name}`,
        duration,
        date, 
        timestamp
    }

    fetch(`http://localhost:3001/api/event`, {
        method: 'POST',
        body: JSON.stringify(data),
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
            const data = JSON.parse(body)
            const { event } = data
            dispatch(receivePostEvent(event))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receivePostEvent())
    })
}

export const getEvents = dispatch => (date = new Date()) => {
    dispatch(requestGetEvents())
    fetch(`http://localhost:3001/api/event?date=${date.toISOString()}`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': getCurrentToken(store.getState()),
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
        const {events} = data
        dispatch(receiveGetEvents(events))
    }).catch(() => {
        dispatch(receiveGetEvents())
    })
}

export const deleteEvent = dispatch => (eventId) => {
    dispatch(requestDeleteEvent())
    fetch(`http://localhost:3001/api/event/${eventId}`, {
        method: 'DELETE',
        headers: {
            'X-AUTH-TOKEN': getCurrentToken(store.getState()),
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
        dispatch(receiveDeleteEvent(eventId))
    })
    .catch(() => {
        dispatch(receiveDeleteEvent())
    })
}

export const modifyEvent = dispatch => (event) => {
    dispatch(requestModifyEvent())
    const timestamp = moment().format('X')
    const data = {
        ...event.oldEvent,
        taskId: event.task.id,
        description: event.description,
        name: `${event.activity.name} - ${event.project.name} - ${event.task.name}`,
        duration: event.duration,
        timestamp
    }

    fetch(`http://localhost:3001/api/event/${event.oldEvent.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-AUTH-TOKEN': getCurrentToken(store.getState()),
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
        dispatch(receiveModifyEvent(data.event))
    })
    .catch(() => {
        dispatch(receiveModifyEvent())
        
    })
}