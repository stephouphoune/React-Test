const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')
const entityManager = require('../services/entityManager')
const asyncHandler = require('../services/asyncHandler')

const createProject = rawProject => ({
  id: rawProject.project_id,
  name: rawProject.name,
  activityId: rawProject.activity_id,
  isVisible: rawProject.isVisible
})

const createProjects = rawProjects => rawProjects.map(createProject)

router.get('/api/project', (req, res) => {
    try {
        executeQuery(`SELECT * FROM project WHERE isDeleted='0'`, (err,rows) => {
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

router.post('/api/project', (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401)
    return res.end()
}
    if (!req.user || !req.user.isAdmin) {
        res.status(401)
        return res.end()
    }
    try {
      const data = req.body
      executeQuery(`INSERT INTO project VALUES (NULL, '${data.name.replace("\'", "\\\'")}', '${data.activityId}' , 1, 0)`, (err, result) => {
          if (err) {
              res.status(500);
              res.end()
              console.log(err)
              return;
          }
          console.log('----------------',result)
          const newProject = {
            id:result.insertId,
            name:data.name,
            activityId: data.activityId,
            isVisible: data.isVisible
          }
          res.send(JSON.stringify({ project: newProject }))
          res.end()
      })
  }
  catch(e) {
      res.status(500);
      res.end();
      console.log(e)
    }
});

router.put('/api/project/:id', (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401)
    return res.end()
}
  try {
      const data = req.body
      console.log('-------------------', data)
      const projectId = req.params.id
      executeQuery(`UPDATE project SET name='${data.name.replace("\'", "\\\'")}' WHERE project_id='${projectId}'`, (err, result) => {
          if (err) {
              res.status(500);
              res.end()
              console.log(err)
              return;
          }
          const newProject = {
              id: parseInt(projectId, 10),
              name: data.name,
              activityId:data.activityId,
              isVisible:data.isVisible
          }
          console.log('-------------',newProject)
          res.send(JSON.stringify({ project: newProject }))
          res.end()
      })
  }
  catch(e) {
      res.status(500);
      res.end();
      console.log(e)
    }
  
});

router.delete('/api/project/:id', asyncHandler(async(req, res) => {
  //Route qui décrit un paramètre d'entrée (c'est du routing)
  if (!req.user || !req.user.isAdmin) {
    res.status(401)
    return res.end()
  }
  const { id } = req.params

  await entityManager.deleteProject(id)
  res.end()
}))

router.patch('/api/project/:id', asyncHandler(async(req, res) => {
  if (!req.user || !req.user.isAdmin) {
      res.status(401)
      return res.end()
  }
    const data = req.body
    const { id } = req.params
  
    await entityManager.setVisibilityProject(id, data.isVisible)
    res.end()
  }))

module.exports = router;