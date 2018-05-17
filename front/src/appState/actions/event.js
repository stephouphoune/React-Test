import * as types from '../types/event'
import store from '../createReduxStore'
import moment from 'moment'
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

export const deleteEvents = (eventIds) => ({
    type: types.DELETE_EVENTS,
    eventIds
})


export const postEvent = dispatch => ({ activity, project, task, description, duration, date }) => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestPostEvent())
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    //const noon = moment().hour(12).minute(0).second(0).toDate()
    //const endDate = moment().hour(12).minute(0).second(0).add(duration, 'minutes').toDate()

    const data = {
        activityId: activity.id,
        projectId: project.id,
        taskId: task.id,
        description,
        startDate: date.toDate(),
        endDate: date.add(duration, 'minutes').toDate(),
        isModified: false,
        isDeleted: false,
        name: `${activity.name} - ${project.name} - ${task.name}`,
        isenId:null,
        duration
    }

    fetch(`http://localhost:3001/api/event`, {
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
        dispatch(receiveDeleteEvent(eventId))
    })
    .catch(() => {
        dispatch(receiveDeleteEvent())
    })
}

export const modifyEvent = dispatch => (event) => {
    dispatch(requestModifyEvent())
    const endDate = moment(event.oldEvent.startDate).clone().add(event.duration, 'minutes')
    const data = {
        ...event.oldEvent,
        activityId: event.activity.id,
        projectId: event.project.id,
        taskId: event.task.id,
        description: event.description,
        endDate,
        name: `${event.activity.name} - ${event.project.name} - ${event.task.name}`,
        duration: event.duration
    }

    fetch(`http://localhost:3001/api/event/${event.oldEvent.id}`, {
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
        dispatch(receiveModifyEvent(data.event))
    })
    .catch(() => {
        dispatch(receiveModifyEvent())
    })
}