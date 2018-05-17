import * as types from '../types/project'
import * as Rtypes from '../types/reset'

const initialState = {
    projects:[]
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case Rtypes.FORCE_RESET:
            return initialState;
        case types.DELETE_PROJECTS:
            return {
                ...state,
                projects: state.projects.filter(({ id }) => 
                    action.projectIds.indexOf(id) === -1
                )
            }
        case types.RECEIVE_DELETE_PROJECT:
        case types.RECEIVE_VISIBILITY_PROJECT:
            return {
                ...state,
                projects: state.projects.map(project => {
                    if (project.id === action.projectId) 
                        return {
                            ...project,
                            isVisible:action.isVisible
                        }
                    return project
                    
                })
            }
        case types.RECEIVE_POST_PROJECT:
        case types.RECEIVE_MODIFY_PROJECT:
        case types.RECEIVE_GET_PROJECTS:
            return {
                ...state, 
                projects: action.projects.reduce((newProjects, project) => {
                    if (!project) return newProjects;

                    const existingProjectIndex = newProjects.findIndex(item => item.id === project.id)
                    if (existingProjectIndex === -1) { // si il est pas dedans
                        return [...newProjects, project] // on l'ajoute
                    }
                    const projects = [...newProjects]
                    projects[existingProjectIndex] = project;
                    return projects;

                }, state.projects)
            }
        default:
            return state
    }
}

export default projectReducer
