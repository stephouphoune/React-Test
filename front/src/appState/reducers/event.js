import * as types from '../types/event'
import * as Rtypes from '../types/reset'

const initialState = {
    events: []
}

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.DELETE_EVENTS:
            return {
                ...state,
                events: state.events.filter(({ id }) => 
                    action.eventIds.indexOf(id) === -1
                )
            }
        case types.RECEIVE_GET_SYNC_EVENTS:
            return {
                ...state
            }
        case types.RECEIVE_POST_EVENT:
        case types.RECEIVE_GET_EVENTS:
        case types.RECEIVE_MODIFY_EVENT:
            return {
                ...state,
                events: action.events.reduce((newEvents, event) => {
                    if (!event) return newEvents;

                    const existingEventIndex = newEvents.findIndex(item => item.id === event.id)
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
