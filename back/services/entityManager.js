const executeQuery2 = require('./executeQuery2')

//-----------------------------------Delete----------------------------------------------------------------------------------

const deleteEvent = async (id) => {
    await executeQuery2(`UPDATE event SET isDeleted='1' WHERE task_id='${id}'`)
}

const deleteTask = async (id) => {
    await executeQuery2(`UPDATE task SET isDeleted='1' WHERE task_id='${id}'`)
    const rawRows = await executeQuery2(`SELECT * FROM event WHERE task_id='${id}'`)
    const events = JSON.parse(JSON.stringify(rawRows))
    for (const event of events) {
        await deleteEvent(event.task_id)
    }
}

const deleteProject = async (id) => {
    await executeQuery2(`UPDATE project SET isDeleted='1' WHERE project_id='${id}'`)
    const rawRows = await executeQuery2(`SELECT * FROM task WHERE project_id='${id}'`)
    const tasks = JSON.parse(JSON.stringify(rawRows))
    for (const task of tasks) {
        await deleteTask(task.task_id)
    }
}

const deleteActivity = async (id) => {
    await executeQuery2(`UPDATE activity SET isDeleted='1' WHERE activity_id='${id}'`)
    const rawRows = await executeQuery2(`SELECT * FROM project WHERE activity_id='${id}'`)
    const projects = JSON.parse(JSON.stringify(rawRows))
    for (const project of projects) {
        await deleteProject(project.project_id)
    }
}

//-----------------------------------Visibility----------------------------------------------------------------------------------

const setVisibilityTask = async (id, checked) => {
    await executeQuery2(`UPDATE task SET isVisible='${checked}' WHERE task_id='${id}'`)
}

const setVisibilityProject = async (id, checked) => {
    await executeQuery2(`UPDATE project SET isVisible='${checked}' WHERE project_id='${id}'`)
    const rawRows = await executeQuery2(`SELECT * FROM task WHERE project_id='${id}'`)
    const tasks = JSON.parse(JSON.stringify(rawRows))
    for (const task of tasks) {
        await setVisibilityTask(task.task_id, checked)
    }
}

const setVisibilityActivity = async (id, checked) => {
    await executeQuery2(`UPDATE activity SET isVisible='${checked}' WHERE activity_id='${id}'`)
    const rawRows = await executeQuery2(`SELECT * FROM project WHERE activity_id='${id}'`)
    const projects = JSON.parse(JSON.stringify(rawRows))
    for (const project of projects) {
        await setVisibilityProject(project.project_id, checked)
    }
}

//-----------------------------------StatsCSV----------------------------------------------------------------------------------

const getEventsCsv = async(username) => {
    const rawRows = await executeQuery2(`SELECT duration, task_id FROM event WHERE username='${username}' AND isDeleted=0`)
    const events = JSON.parse(JSON.stringify(rawRows))
    const arrayDurationsTasksProjectsActivities = []
    for (const event of events) {
        arrayDurationsTasksProjectsActivities.push([event.duration, await getTasksCsv(event.task_id)])
    }
    return arrayDurationsTasksProjectsActivities
}

const getTasksCsv = async (taskId) => {
    const rawRows = await executeQuery2(`SELECT name, project_id FROM task WHERE task_id=${taskId}`)
    const tasks = JSON.parse(JSON.stringify(rawRows))
    const arrayTasksProjectsActivities = []
    for (const task of tasks) {
        arrayTasksProjectsActivities.push(task.name, await getProjectsCsv(task.project_id))
    }
    return arrayTasksProjectsActivities
}

const getProjectsCsv = async(projectId) => {
    const rawRows = await executeQuery2(`SELECT name, activity_id FROM project WHERE project_id=${projectId}`)
    const projects = JSON.parse(JSON.stringify(rawRows))
    const arrayProjectsActivities = []
    for (const project of projects) {
        arrayProjectsActivities.push(project.name, await getActivitiesCsv(project.activity_id))
    }
    return arrayProjectsActivities
}

const getActivitiesCsv = async(activityId) => {
    const rawRows = await executeQuery2(`SELECT name FROM activity WHERE activity_id=${activityId}`)
    const activities = JSON.parse(JSON.stringify(rawRows))
    const arrayActivities = []
    for (const activity of activities) {
        arrayActivities.push(activity.name)
    }
    return arrayActivities
}

//-----------------------------------StatsActivities----------------------------------------------------------------------------------

const getEventsStatsActivities = async(username) => {
    const rawRows = await executeQuery2(`SELECT duration, task_id FROM event WHERE username='${username}' AND isDeleted=0`)
    const events = JSON.parse(JSON.stringify(rawRows))
    let tasks = null
    for (const event of events) {
        tasks = await getTasksStatsActivities(event.task_id, events)
    }
    return tasks
}

const getTasksStatsActivities = async (taskId, events) => {
    const rawRows = await executeQuery2(`SELECT name, project_id FROM task WHERE task_id=${taskId}`)
    const tasks = JSON.parse(JSON.stringify(rawRows))
    let projects = null
    for (const task of tasks) {
        projects = await getProjectsStatsActivities(task.project_id, events)
    }
    return projects
}

const getProjectsStatsActivities = async(projectId, events) => {
    const rawRows = await executeQuery2(`SELECT name, activity_id FROM project WHERE project_id=${projectId}`)
    const projects = JSON.parse(JSON.stringify(rawRows))
    let activities = []
    for (const project of projects) {
        activities = await getActivitiesStatsActivities(project.activity_id, events)
    }
    return activities
}

const getActivitiesStatsActivities = async(activityId, events) => {
    const rawRows = await executeQuery2(`SELECT name FROM activity WHERE activity_id=${activityId}`)
    const activities = JSON.parse(JSON.stringify(rawRows))
    const arrayActivities = []
    let durationActivity = 0
    for (const activity of activities) {
        for (event of events)
        {
            durationActivity=durationActivity+event.duration
        }
        arrayActivities.push(activity.name, durationActivity)
    }
    console.log('-----------------',arrayActivities)
    return arrayActivities
}

//-----------------------------------StatsActivity----------------------------------------------------------------------------------



module.exports = {
    setVisibilityActivity, 
    setVisibilityProject, 
    setVisibilityTask,
    deleteEvent,
    deleteTask,
    deleteProject,
    deleteActivity, 
    getActivitiesCsv, 
    getProjectsCsv, 
    getTasksCsv, 
    getEventsCsv, 
    getActivitiesStatsActivities,
    getEventsStatsActivities,
    getProjectsStatsActivities,
    getTasksStatsActivities
}