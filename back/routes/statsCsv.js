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
    await entityManager.getTaskIdAndDurationFromEvents(user.username)
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