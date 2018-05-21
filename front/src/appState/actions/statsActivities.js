import * as types from '../types/statsActivities'
import store from '../createReduxStore'

const receiveStatsActivities = (statsActivities = []) => ({
    type: types.RECEIVE_GET_STATS_ACTIVITIES,
    statsActivities
})

export const getStatsActivities = dispatch => () => {
    fetch(`http://localhost:3001/api/statsActivities`, {
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
            console.log(data)
            dispatch(receiveStatsActivities(data))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveStatsActivities())
    })
}