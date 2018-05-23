import * as types from '../types/statsCsv'
import store from '../createReduxStore'

const receiveStatsCsv = (statsCsv = []) => ({
    type: types.RECEIVE_GET_STATS_CSV,
    statsCsv
})

export const getStatsCsv = dispatch => () => {
    fetch(`http://localhost:3001/api/statsCsv`, {
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
            const data=JSON.parse(body)
            dispatch(receiveStatsCsv(data))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveStatsCsv())
    })
}