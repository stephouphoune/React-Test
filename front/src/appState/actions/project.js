import * as types from '../types/project'
import store from '../createReduxStore'
import { requestGetTasks } from './task'

const requestProject = () => ({
    type: types.REQUEST_GET_PROJECTS
})

const receiveProject = (projects = []) => ({
    type: types.RECEIVE_GET_PROJECTS,
    projects
})

const receivePostProject = (project) => ({
    type: types.RECEIVE_POST_PROJECT,
    projects: [project]
})

const receiveDeleteProject = (projectId) => ({
    type: types.RECEIVE_DELETE_PROJECT,
    projectId
})

const receiveModifyProject = (project) => ({
    type: types.RECEIVE_MODIFY_PROJECT,
    projects:[project]
})

export const deleteProjects = (projectIds) => ({
    type: types.DELETE_PROJECTS,
    projectIds
})

export const requestGetProjects = dispatch => () => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestProject())
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/project`, {
        method: 'GET',
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
            const { projects } = data
            dispatch(receiveProject(projects))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveProject())
    })
}

export const postProject = dispatch => ({name, activityId}) => {
    const data = {
        name, 
        activityId
    }
    fetch(`http://localhost:3001/api/project`, {
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
            const { project } = data
            dispatch(receivePostProject(project))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receivePostProject())
    })
}

export const modifyProject = dispatch => ({name, projectId, activityId}) => {

    const data = {
        name, 
        projectId, 
        activityId
    }

    fetch(`http://localhost:3001/api/project/${projectId}`, {
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
        const { project } = data
        dispatch(receiveModifyProject(project))
    })
    .catch(() => {
        dispatch(receiveModifyProject())
    })
}

export const deleteProject = dispatch => (projectId) => {
    fetch(`http://localhost:3001/api/project/${projectId}`, {
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
        dispatch(receiveDeleteProject(projectId))
    })
    .catch(() => {
        dispatch(receiveDeleteProject())
    })
}