import * as types from '../types/event'

const initialState = {
    events: []
}

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RECEIVE_POST_EVENT:
        case types.RECEIVE_GET_EVENTS:
        case types.RECEIVE_MODIFY_EVENT:
            return {
                ...state,
                events: action.events.reduce((newEvents, event) => {
                    if (!event) return newEvents;

                    const existingEventIndex = newEvents.findIndex(item => item.id === event.id)
                    console.log('existingEventIndex', existingEventIndex, event)
                    if (existingEventIndex === -1) { // si il est pas dedans
                        return [...newEvents, event] // on l'ajoute
                    }
                    const events = [...newEvents]
                    events[existingEventIndex] = event;
                    return events;

                }, state.events)
            }
        case types.RECEIVE_DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => {
                    if (event.id === action.eventId) return false // on le garde pas
                    return true
                })
            }
        default:
            return state
    }
}
export default eventReducer
