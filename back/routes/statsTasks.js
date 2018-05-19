const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')

/* GET Stats */
router.get('/api/statsTasks', (req, res) => {

  const projectId = req.query.projectId
  const user = req.user

  // si on un project
  try {
    executeQuery(`SELECT task_id FROM task WHERE project_id=${projectId}`, (err, rows) => {
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
        const taskIds = JSON.parse(JSON.stringify(rows))
        // JSON.parse peut engendrer un crash (donc try / catch)
        const sqlTaskIds = taskIds.map(item => item.task_id).join(', ')

        executeQuery(`SELECT * FROM event WHERE task_id in (${sqlTaskIds}) AND username='${user.username}'`, (err2, rows2) => {

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
            
            const events = JSON.parse(JSON.stringify(rows2))
            
            const stats = events.reduce((acc, event) => {
              const statTaskIndex = acc.findIndex(item => item.taskId === event.task_id)
              if (statTaskIndex === -1) {
                return [
                  ...acc,
                  {
                    taskId: event.task_id,
                    duration: event.duration,
                    choice: 'task'
                  }
                ]
              }

              const currentStat = acc[statTaskIndex]
              const newStats = [...acc]
              newStats[statTaskIndex] = {
                ...currentStat,
                duration: currentStat.duration + event.duration,
                choice: 'task'
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
  }

});

module.exports = router;