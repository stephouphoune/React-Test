const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const executeQuery = require('../services/executeQuery')

const createEvent = rawEvent => ({
    id: rawEvent.event_id,
    name: rawEvent.name,
    description: rawEvent.description,
    isModified: rawEvent.isModified,
    isDeleted: rawEvent.isDeleted,
    creationDate: rawEvent.creationDate,
    lastUpdateDate: rawEvent.lastUpdateDate,
    startDate: rawEvent.startDate,
    endDate: rawEvent.endDate,
    isenId: rawEvent.isen_id,
    taskId: rawEvent.task_id,
    username: rawEvent.username,
})
  
const createEvents = rawEvents => rawEvents.map(createEvent)
  

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



/* POST home page. */
router.post('/api/event', (req, res) => {
    try {
        const data = req.body
        const now = new Date()
        const duration = data.duration
        //console.log(req.body)
        executeQuery(`INSERT INTO event VALUES(NULL, '${data.description.replace("\'", "\\\'")}', ${data.isModified}, ${data.isDeleted}, '${now.toMysqlFormat()}', '${now.toMysqlFormat()}', '${new Date(data.startDate).toMysqlFormat()}', '${new Date(data.endDate).toMysqlFormat()}', ${data.isenId ? data.isenId : 'NULL'}, '${data.name}', '${data.taskId}', '${req.user.username}', ${duration})`, (err, result) => {
            if (err) {
                res.status(500);
                res.end()
                console.log(err)
                return;
            }
            const newEventId = result.insertId
            const newEvent = {
                id: newEventId,
                name: data.name,
                description: data.description,
                isModified: data.isModified,
                isDeleted: data.isDeleted,
                creationDate: now,
                lastUpdateDate: now,
                startDate: data.startDate,
                endDate: data.endDate,
                isenId: null,
                taskId: data.taskId,
                username: data.username,
            }
            
            res.send(JSON.stringify({ event: newEvent }))
            res.end()
        })
    }
    catch(e) {
        res.status(500);
        res.end();
        console.log(e)
      }
    
    });

router.get('/api/event', (req, res) => {
    try {
        const date = req.query.date
        console.log(date)
        const user = req.user
        executeQuery(`SELECT * FROM event WHERE ${getMysqlDateCompare(new Date(date))} AND username='${user.username}'`, (err, rows) => {
            if (err) {
                res.status(500);
                res.end()
                console.log(err)
                return;
            }
            const rawEvents = JSON.parse(JSON.stringify(rows))
            const events = createEvents(rawEvents)
            res.send(JSON.stringify({events}))
            res.end()
        })
    } catch(e) {
        res.status(500)
        res.end()
        console.log(e)
    }
})

router.put('/api/event/:id', (req, res) => {
    try {
        const data = req.body
        const now = new Date()
        const eventId = req.params.id
        const user = req.user
        //console.log(req.body)
        executeQuery(`UPDATE event SET description='${data.description}', isModified=${data.isModified}, isDeleted=${data.isDeleted}, lastUpdateDate='${now.toMysqlFormat()}', startDate='${new Date(data.startDate).toMysqlFormat()}', endDate='${new Date(data.endDate).toMysqlFormat()}', name='${data.name}', task_id='${data.taskId}', duration=${data.duration} WHERE event_id=${eventId} AND username='${user.username}'`, (err, result) => {
            if (err) {
                res.status(500);
                res.end()
                console.log(err)
                return;
            }
            const newEvent = {
                id: parseInt(eventId, 10),
                name: data.name,
                description: data.description,
                isModified: data.isModified,
                isDeleted: data.isDeleted,
                creationDate: data.creationDate,
                lastUpdateDate: now,
                startDate: data.startDate,
                endDate: data.endDate,
                isenId: data.isenId,
                taskId: data.taskId,
                username: data.username,
            }
            
            res.send(JSON.stringify({ event: newEvent }))
            res.end()
        })
    }
    catch(e) {
        res.status(500);
        res.end();
        console.log(e)
      }
    
    });


router.delete('/api/event/:id', (req, res) => {
    const eventId = req.params.id
    const username = req.user.username
    try {
        executeQuery(`DELETE FROM event WHERE event_id=${eventId} AND username='${username}'`, (err, rows) => {
            if (err) {
                res.status(500);
                res.end()
                console.log(err)
                return;
            } 
            res.end()
        })
    }
    catch(e) {
        res.status(500)
        res.end()
        console.log(e)
    }
})
 
module.exports = router;