const express = require('express');
const router = express.Router();
const entityManager = require('../services/entityManager')
const executeQuery = require('../services/executeQuery')
const asyncHandler = require('../services/asyncHandler')

/* GET Stats */
router.get('/api/statsCsv', asyncHandler(async(req, res) => {
  //Route qui décrit un paramètre d'entrée (c'est du routing)
  
  try{
    const user = req.user
    const statsCsvTemp = await entityManager.getEventsCsv(user.username)
    const statsCsv = []
    for (let i=0;i<statsCsvTemp.length;i++)
    {
      statsCsv.push([statsCsvTemp[i][1][1][1][0], statsCsvTemp[i][1][1][0], statsCsvTemp[i][1][0], ((statsCsvTemp[i][0])/60).toString().replace(/[.]/, ",")])
    }
    res.send(statsCsv)
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