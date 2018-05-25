import * as types from '../types/activity'
import * as Rtypes from '../types/reset'
import * as Ptypes from '../types/fullPurge'

const initialState = {
    activities: []
}

const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case Ptypes.FULL_PURGE:
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.RECEIVE_DELETE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.filter(activity => {
                    if (activity.id === action.activityId) return false //on le garde pas
                    return true
                })
            }
        case types.RECEIVE_VISIBILITY_ACTIVITY:
            return {
                ...state,
                activities: state.activities.map(activity => {
                    if (action.activityIds.find(id => id === activity.id)) 
                        return {
                            ...activity,
                            isVisible:action.isVisible
                        }
                    return activity
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
