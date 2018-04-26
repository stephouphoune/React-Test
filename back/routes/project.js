const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')

const createProject = rawProject => ({
  id:rawProject.project_id,
  name:rawProject.name,
  activityId:rawProject.activity_id
})

const createProjects = rawProjects => rawProjects.map(createProject)

router.get('/api/project', (req, res) => {
    try {
        executeQuery('SELECT * FROM project', (err,rows) => {
          if (err) {
            res.status(500);
            res.end()
            return;
          }
          if (rows.length === 0) {
            res.status(200);
            res.send(JSON.stringify({projects:[]}));
            res.end()
            return;
          }
          // JSON.parse peut engendrer un crash (donc try / catch)
          try {
            //Constante contenant le résultat de la requête. J'ai mis [0] parce qu'il n'y a que
            //le premier élément du tableau qui nous intéresse
            const rawProjects = JSON.parse(JSON.stringify(rows));
            const projects = createProjects(rawProjects);
            //Pourquoi mettre des accolades autour de activities ?
            const responseBody = JSON.stringify({projects})
            res.status(200)
            res.send(responseBody)
            res.end()
            return;
      
           } catch (e) {
            res.status(500)
            res.end()
            return;
           }
        });
      }
      catch(e) {
        res.status(500);
        res.end();
      }
    
    });

router.delete('/api/project/:id', (req, res) => {
  //Route qui décrit un paramètre d'entrée (c'est du routing)
  const { id } = req.params
})

module.exports = router;