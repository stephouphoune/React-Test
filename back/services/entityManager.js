const executeQuery2 = require('./executeQuery2')

const deleteEvent = async (id) => {

    await executeQuery2('suppr l event')
}

const deleteTask = async (id) => {

    await executeQuery2('suppr la tache')
    const rawRows = await executeQuery2('recup les events lié')
    const events = JSON.parse(JSON.stringify(rawRows))

    for (const event of events) {

        await deleteEvent(event.id)

    }

}

const deleteProject = async (id) => {

    await executeQuery2('suppr le projet')
    const rawRows = await executeQuery2('recup les task lié')
    const tasks = JSON.parse(JSON.stringify(rawRows))

    for (const task of tasks) {

        await deleteEvent(task.id)

    }

}

const deleteActivity = async (id) => {

    await executeQuery2('suppr l activite')
    const rawRows = await executeQuery2('recup les projects lié')
    const projects = JSON.parse(JSON.stringify(rawRows))

    for (const project of projects) {

        await deleteEvent(project.id)

    }

}

module.exports = {
    deleteEvent,
    deleteTask,
    deleteProject,
    deleteActivity
}