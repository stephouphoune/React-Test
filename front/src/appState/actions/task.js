import * as types from '../types/task'
import store from '../createReduxStore'

const requestTask = () => ({
    type: types.REQUEST_GET_TASKS
})

const receiveTask = (tasks = []) => ({
    type: types.RECEIVE_GET_TASKS,
    tasks
})

const receiveDeleteTask = (taskId) => ({
    type: types.RECEIVE_DELETE_TASK,
    taskId
})


export const requestGetTasks = dispatch => () => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestTask())
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/task`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': store.getState().user.token
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
            const data=JSON.parse(body)
            const { tasks } = data
            dispatch(receiveTask(tasks))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveTask())
    })
}

export const deleteTask = dispatch => (taskId) => {
    fetch(`http://localhost:3001/api/task/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status !== 200) {
            throw Error('')
        }
        return response.text()
        console.log(response)
    })
    .then(body => {
        dispatch(receiveDeleteTask(taskId))
    })
    .catch(() => {
        dispatch(receiveDeleteTask())
    })
}