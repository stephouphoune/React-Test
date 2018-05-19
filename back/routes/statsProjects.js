const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')

/* GET Stats */
router.get('/api/statsProjects', (req, res) => {

  const activityId = req.query.activityId
  const user = req.user

  // si on un project
  try {
    executeQuery(`SELECT project_id, name FROM project WHERE activity_id=${activityId}`, (err, rows) => {
      if (err) {
        res.status(500);
        res.end()
        return;
      }

      if (rows.length === 0) {
        res.status(200);
        res.send(JSON.stringify({ stats: [] }));
        res.end()
        return;
      }
    try {
      const projectIds = JSON.parse(JSON.stringify(rows))
      const sqlProjectIds = projectIds.map(item => item.project_id).join(', ')
      executeQuery(`SELECT task_id, project_id FROM task WHERE project_id in (${sqlProjectIds})`, (err2, rows2) => {
        if (err2) {
          res.status(500);
          res.end()
          return;
        }

        if (rows2.length === 0) {
          res.status(200);
          res.send(JSON.stringify({ stats: [] }));
          res.end()
          return;
        }

        try {  
          const tasks = JSON.parse(JSON.stringify(rows2))
          // JSON.parse peut engendrer un crash (donc try / catch)
          const sqlTaskIds = tasks.map(item => item.task_id).join(', ')
          executeQuery(`SELECT * FROM event WHERE task_id in (${sqlTaskIds}) AND username='${user.username}'`, (err3, rows3) => {

            if (err3) {
              res.status(500);
              res.end()
              return;
            }
      
            if (rows3.length === 0) {
              res.status(200);
              res.send(JSON.stringify({ stats: [] }));
              res.end()
              return;
            }

            try {
              const events = JSON.parse(JSON.stringify(rows3))
              const stats = events.reduce((acc, event) => {
                const statTaskIndex = acc.findIndex(item => item.taskId === event.task_id)
                
                if (statTaskIndex === -1) {
                  console.log(tasks.find(task => task.task_id === event.task_id).project_id)
                  return [
                    ...acc,
                    {
                      projectId:tasks.find(task => task.task_id === event.task_id).project_id,
                      taskId: event.task_id,
                      duration: event.duration,
                      choice:'project'
                    }
                  ]
                }
                
                const currentStat = acc[statTaskIndex]
                const newStats = [...acc]
                newStats[statTaskIndex] = {
                  ...currentStat,
                  duration: currentStat.duration + event.duration,
                  choice: 'project'
                }
                return newStats
              }, [])
              res.send(JSON.stringify({ stats }))

            } catch(e) {
              res.status(500)
              res.end()
              return;
            }

          })
      } catch (e) {
        res.status(500)
        res.end()
        return;
      }
    });
  }
    catch (e) {
      res.status(500);
      res.end();
      return
    }
  });
}
catch (e) {
  res.status(500);
  res.end();
}

});

module.exports = router;