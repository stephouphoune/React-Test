const executeQuery2 = require('./executeQuery2')

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


module.exports = {
    deleteEvent,
    deleteTask,
    deleteProject,
    deleteActivity
}