import * as types from '../types/project'
import * as Rtypes from '../types/reset'

const initialState = {
    projects:[]
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.RECEIVE_POST_PROJECT:
        case types.RECEIVE_MODIFY_PROJECT:
        case types.RECEIVE_GET_PROJECTS:
            return {
                ...state, 
                projects: action.projects.reduce((newActivities, project) => {
                    if (!project) return newActivities;

                    const existingProjectIndex = newActivities.findIndex(item => item.id === project.id)
                    if (existingProjectIndex === -1) { // si il est pas dedans
                        return [...newActivities, project] // on l'ajoute
                    }
                    const projects = [...newActivities]
                    projects[existingProjectIndex] = project;
                    return projects;

                }, state.projects)
            }
        default:
            return state
    }
}

export default projectReducer
