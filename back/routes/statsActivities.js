const express = require('express');
const router = express.Router();
const entityManager = require('../services/entityManager')
const executeQuery = require('../services/executeQuery')
const asyncHandler = require('../services/asyncHandler')

/* GET Stats */
router.get('/api/statsActivities', asyncHandler(async(req, res) => {
    
  try{
    const user = req.user
    //const statsActivities = await entityManager.getEventsStatsActivities(user.username)
    //console.log(statsActivities)
    //res.send(statsActivities)
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