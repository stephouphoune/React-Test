const express = require('express');
const router = express.Router();
const entityManager = require('../services/entityManager')
const executeQuery = require('../services/executeQuery')
const asyncHandler = require('../services/asyncHandler')

/* GET Stats */
router.get('/api/statsActivities', asyncHandler(async(req, res) => {
    
  try{
    const user = req.user
    const statsActivitiesTemp = await entityManager.getEventsStatsActivities(user.username)
    console.log(statsActivitiesTemp)
    /*const statsActivities = []
    for (let i=0;i<statsActivitiesTemp.length;i++)
    {
      statsActivities.push([statsActivitiesTemp[i][0][1][1][0], statsActivitiesTemp[i][0][1][1][1]])
    }*/
    //console.log(statsActivities)
    //res.send(statsCsv)
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