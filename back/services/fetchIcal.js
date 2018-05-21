const ical = require('node-ical')

const fetchIcal = (url, date) => new Promise((resolve, reject) => {

  ical.fromURL(url, {}, (err, data) => {

    if (err) {
      reject(err)
      return;
    }

    if (typeof data === 'object') {
      reject('Unexcepted ical data receive')
      return;
    }

    resolve(data)

  });

});

module.exports = fetchIcal;
