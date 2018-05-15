const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')
const executeQuery2 = require('../services/executeQuery2')

const createLabel = rawLabel => ({
  name: rawLabel.name
})

const createLabels = rawLabels => rawLabels.map(createLabel)

/* GET Label */
router.get('/api/label', async (req, res) => {
  try {

    const rows = await executeQuery2('SELECT * FROM label')

    if (rows.length === 0) {
      res.status(200);
      res.send(JSON.stringify({ labels: [] }));
      res.end()
      return;
    }

    //Constante contenant le résultat de la requête. J'ai mis [0] parce qu'il n'y a que
    //le premier élément du tableau qui nous intéresse
    const rawLabels = JSON.parse(JSON.stringify(rows));
    const labels = createLabels(rawLabels);
    //Pourquoi mettre des accolades autour de Labels ?
    const responseBody = JSON.stringify({ labels })
    res.status(200)
    res.send(responseBody)
    res.end()

  } catch (e) {
    res.status(500);
    res.end();
  }

});


router.delete('/api/label/:id', (req, res) => {
  //Route qui décrit un paramètre d'entrée (c'est du routing)
  const { id } = req.params
})

module.exports = router;