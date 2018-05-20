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

const getTaskIdAndDurationFromEvents = async(username) => {
    const rawRows = await executeQuery2(`SELECT task_id, duration FROM event WHERE username='${user.username}' AND isDeleted=0`)
    const events = JSON.parse(JSON.stringify(rawRows))
    for (const event of events) {
        console.log(event)
        await getTaskNameFromTasks(event.task_id, event.duration)
    }
}

const getTaskNameFromTasks = async (taskId, duration) => {
    const rawRows = await executeQuery2(`SELECT name, project_id FROM task WHERE task_id=${taskId}`)
    const tasks = JSON.parse(JSON.stringify(rawRows))
    for (const task of tasks) {
        await getProjectNameFromProjects(task.project_id, task.name, duration)
    }
}

const getProjectNameFromProjects = async(projectId, taskName, duration) => {
    const rawRows = await executeQuery2(`SELECT activity_id, name FROM project WHERE project_id=${projectId}`)
    const projects = JSON.parse(JSON.stringify(rawRows))
    for (const project of projects) {
        await getActivityNameFromActivity(project.activity_id, project.name, taskName, duration)
    }
}

const getActivityNameFromActivity = async(activityId, projectName, taskName, duration) => {
    const rawRows = await executeQuery2(`SELECT name FROM activity WHERE activity_id=${activityId}`)
    const activities = JSON.parse(JSON.stringify(rawRows))
    const statsCsv = []
    for (const activity of activities) {
        statsCsv.push([`'${activity.name}', '${projectName}', '${taskName}', '${duration}'`])
    }
    return statsCsv
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
    getActivityNameFromActivity,
    getProjectNameFromProjects, 
    getTaskIdAndDurationFromEvents, 
    getTaskNameFromTasks
}