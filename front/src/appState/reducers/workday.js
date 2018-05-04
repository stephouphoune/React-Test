import * as types from '../types/workday'
import * as Rtypes from '../types/reset'

const initialState = {
    workdays: [],
    putLoading: false
}

const workdayReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.REQUEST_PUT_WORKDAYS:
            //Peut être penser à mettre une variable à true pour montrer
            //que c'est en train de charger
            return {
                ...state,
                putLoading: true,
            }
        case types.RECEIVE_GET_WORKDAYS:
            return {
                ...state,
                workdays: action.workdays
            }
        case types.RECEIVE_PUT_WORKDAYS:
            const workday = action.workday
            const workdays = state.workdays
            const oldWorkdayIndex = workdays.findIndex(item => item.id === workday.id)
            if (oldWorkdayIndex === -1) { // si il est pas dedans
                return {
                    ...state,
                    workdays,
                    putLoading:false,
                }
            }
            const newWorkdays = [...workdays]
            newWorkdays[oldWorkdayIndex] = workday
            return {
                ...state, 
                workdays: newWorkdays,
                putLoading:false,
            }
        default:
            return state
    }
}

export default workdayReducer
