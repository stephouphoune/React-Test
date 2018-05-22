const moment = require('moment')
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
    const rawRows = await executeQuery2(`SELECT name, project_id FROM task WHERE task_id='${taskId}'`)
    const tasks = JSON.parse(JSON.stringify(rawRows))
    const arrayTasksProjectsActivities = []
    for (const task of tasks) {
        arrayTasksProjectsActivities.push(task.name, await getProjectsCsv(task.project_id))
    }
    return arrayTasksProjectsActivities
}

const getProjectsCsv = async(projectId) => {
    const rawRows = await executeQuery2(`SELECT name, activity_id FROM project WHERE project_id='${projectId}'`)
    const projects = JSON.parse(JSON.stringify(rawRows))
    const arrayProjectsActivities = []
    for (const project of projects) {
        arrayProjectsActivities.push(project.name, await getActivitiesCsv(project.activity_id))
    }
    return arrayProjectsActivities
}

const getActivitiesCsv = async(activityId) => {
    const rawRows = await executeQuery2(`SELECT name FROM activity WHERE activity_id='${activityId}'`)
    const activities = JSON.parse(JSON.stringify(rawRows))
    const arrayActivities = []
    for (const activity of activities) {
        arrayActivities.push(activity.name)
    }
    return arrayActivities
}

//-----------------------------------StatsActivities----------------------------------------------------------------------------------

const getEventsStatsActivities = async(username) => {
    const rawRows = await executeQuery2(`SELECT MONTH(startDate), duration, task_id FROM event WHERE username='${username}' AND isDeleted=0 AND MONTH(startDate) between (MONTH(startDate)-6) AND '${moment(now, "M")}'`)
    const events = JSON.parse(JSON.stringify(rawRows))
    
    const activitiesStats = []
    // { activityId, name, duration }
    for (const event of events) {
        const activity = await getActivityFromTaskId(event.task_id)
        if (activitiesStats.findIndex(stat => stat.activityId === activity.activity_id) === -1) { // si y'a pas de stat pour l'instant pour l'activityId
            activitiesStats.push({
                activityId: activity.activity_id,
                name: activity.name,
                duration: event.duration
            })
        }
        else {
            const stat = activitiesStats[activitiesStats.findIndex(stat => stat.activityId === activity.activity_id)]
            const newStat = {
                ...stat,
                duration: stat.duration + event.duration
            }
            activitiesStats[activitiesStats.findIndex(stat => stat.activityId === activity.activity_id)] = newStat
        }
    }
    return activitiesStats
}

const getActivityFromTaskId = async(taskId) => {
    const rawRows = await executeQuery2(`SELECT * from task WHERE task_id='${taskId}'`)
    const tasks = JSON.parse(JSON.stringify(rawRows))
    const task = tasks[0]
    if (!task) return null;

    const projectId = task.project_id
    const rawRows2 = await executeQuery2(`SELECT * from project WHERE project_id='${projectId}'`)
    const projects = JSON.parse(JSON.stringify(rawRows2))
    const project = projects[0]
    if (!project) return null;

    const activityId = project.activity_id
    const rawRows3 = await executeQuery2(`SELECT * from activity WHERE activity_id='${activityId}'`)
    const activities = JSON.parse(JSON.stringify(rawRows3))
    const activity = activities[0]
    if (!activity) return null;

    return activity
}

//-----------------------------------StatsProjects----------------------------------------------------------------------------------

getProjectsFromActivityId = async(username, activityId) => {
    const rawRows = await executeQuery2(`SELECT project_id FROM project WHERE activity_id='${activityId}'`)
    const projects = JSON.parse(JSON.stringify(rawRows))
    let durationProject = 0
    const projectsStats = []
    for (const project of projects)
    {
        const durations = await getEventsStatsProjects(username, project.project_id)
        
        for (duration of durations)
        {
            durationProject+=duration.duration
        }
        projectsStats.push({projectId:project.project_id, duration:durationProject})
        durationProject=0
    }
    return projectsStats
}

const getEventsStatsProjects = async(username, projectId) => {
    const rawRows = await executeQuery2(`SELECT task_id FROM task WHERE project_id='${projectId}'`)
    const taskIds = JSON.parse(JSON.stringify(rawRows))
    const sqlTaskIds = taskIds.map(item => item.task_id).join(', ')
    const rawRows2 = await executeQuery2(`SELECT duration FROM event WHERE task_id in (${sqlTaskIds})`)
    const duration = JSON.parse(JSON.stringify(rawRows2))
    
    return duration
}



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
    getEventsStatsActivities,
    getActivityFromTaskId, 
    getProjectsFromActivityId, 
    getEventsStatsProjects
}