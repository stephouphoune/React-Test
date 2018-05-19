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

const receivePostTask = (task) => ({
    type: types.RECEIVE_POST_TASK,
    tasks: [task]
})

const receiveModifyTask = (task) => ({
    type: types.RECEIVE_MODIFY_TASK,
    tasks:[task]
})

const receiveVisibilityTask = (taskIds, isVisible) => ({
    type: types.RECEIVE_VISIBILITY_TASK,
    taskIds,
    isVisible
})

export const deleteTasks = taskIds => ({
    type: types.DELETE_TASKS,
    taskIds
})

export const setVisibilityTasks = (taskIds, isVisible) => ({
    type: types.VISIBILITY_TASKS,
    taskIds, 
    isVisible
})

export const requestGetTasks = dispatch => () => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestTask())
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/task`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': store.getState().user.token,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
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
        dispatch(receiveDeleteTask(taskId))
    })
    .catch(() => {
        dispatch(receiveDeleteTask())
    })
}

export const postTask = dispatch => ({name, projectId, isVisible}) => {
    const data = {
        name,
        projectId, 
        isVisible
    }
    fetch(`http://localhost:3001/api/task`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-AUTH-TOKEN': store.getState().user.token,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
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
            const { task } = data
            dispatch(receivePostTask(task))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receivePostTask())
    })
}

export const modifyTask = dispatch => ({name, taskId, projectId}) => {

    const data = {
        name, 
        taskId,
        projectId
    }

    fetch(`http://localhost:3001/api/task/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
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
        const data = JSON.parse(body)
        const { task } = data
        dispatch(receiveModifyTask(task))
    })
    .catch(() => {
        dispatch(receiveModifyTask())
    })
}

export const setVisibilityTask = dispatch => ({taskId, isVisible}) => {
    
    const data = {
        taskId, 
        isVisible
    }
    fetch(`http://localhost:3001/api/task/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
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
        dispatch(receiveVisibilityTask([taskId], isVisible))
    })
    .catch(() => {
        dispatch(receiveVisibilityTask())
    })
}