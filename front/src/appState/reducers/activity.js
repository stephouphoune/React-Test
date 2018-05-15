import * as types from '../types/activity'
import * as Rtypes from '../types/reset'

const initialState = {
    activities: []
}

const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.REQUEST_GET_ACTIVITIES:
        //Peut être penser à mettre une variable à true pour montrer
        //que c'est en train de charger
            return {
                ...state,
            }
        
        case types.RECEIVE_DELETE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.filter(activity => {
                    if (activity.id === action.activityId) return false //on le garde pas
                    return true
                })
            }
        case types.RECEIVE_POST_ACTIVITY:
        case types.RECEIVE_MODIFY_ACTIVITY:
        case types.RECEIVE_GET_ACTIVITIES:
            return {
                ...state, 
                activities: action.activities.reduce((newActivities, activity) => {
                    if (!activity) return newActivities;

                    const existingActivityIndex = newActivities.findIndex(item => item.id === activity.id)
                    if (existingActivityIndex === -1) { // si il est pas dedans
                        return [...newActivities, activity] // on l'ajoute
                    }
                    const activities = [...newActivities]
                    activities[existingActivityIndex] = activity;
                    return activities;

                }, state.activities)
            }
        default:
            return state
    }
}

export default activityReducer
