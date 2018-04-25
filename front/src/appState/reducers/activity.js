import * as types from '../types/activity'

const initialState = {
    activity_id:null,
    name:null,
}

const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ACTIVITY_REQUEST:
            return {
                ...state,
            }
        case types.ACTIVITY_RECEIVE:
            return {
                ...state,
                activity_id:action.activity_id,
                name: action.name,    
            }
        default:
            return state
    }
}

export default activityReducer
