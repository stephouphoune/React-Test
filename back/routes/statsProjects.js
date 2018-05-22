const express = require('express');
const router = express.Router();
const entityManager = require('../services/entityManager')
const executeQuery = require('../services/executeQuery')
const asyncHandler = require('../services/asyncHandler')

/* GET Stats */
router.get('/api/statsProjects', asyncHandler(async(req, res) => {
    
  try{
    const user = req.user
    const statsProjects = await entityManager.getProjectsFromActivityId(user.username, req.query.activityId)
    console.log(statsProjects)
    res.send(statsProjects)
    res.end()

  }
  catch(e){
    console.log(e)
    res.status(500)
    res.end()
    return;
  }
}))

module.exports = router;