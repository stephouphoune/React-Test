const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')

function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

Date.prototype.toMysqlFormat = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

Date.prototype.toMysqlFormatDay = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate());
}

const getMysqlDateCompare = date =>
  `startDate >= '${date.toMysqlFormatDay()} 00:00:00' AND startDate <= '${date.toMysqlFormatDay()} 23:59:59'`


/* GET Advancement */
router.get('/api/advancement', (req, res) => {
    try {
        const date = req.query.date
        console.log(date)
        const user = req.user
        executeQuery(`SELECT SUM(duration) as sumduration FROM event WHERE ${getMysqlDateCompare(new Date(date))} AND username='${user.username}'`, (err,rows) => {
          if (err) {
            res.status(500);
            res.end()
            return;
          }
          
          // JSON.parse peut engendrer un crash (donc try / catch)
          try {
            //Constante contenant le résultat de la requête. J'ai mis [0] parce qu'il n'y a que
            //le premier élément du tableau qui nous intéresse
            const advancement = JSON.parse(JSON.stringify(rows));
            const responseBody = JSON.stringify({advancement})
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

module.exports = router;