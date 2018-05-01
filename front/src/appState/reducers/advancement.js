import * as types from '../types/advancement'

const initialState = {
    advancement: 0
}

const advancementReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RECEIVE_GET_ADVANCEMENT:
            return {
                ...state,
                advancement: action.advancement
            }
        default:
            return state
    }
}

export default advancementReducer
