const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DB = {
  games: [
    {
      name: 'GTA V',
      id: 2312,
      year: 2013,
      price: 100
    },
    {
      name: 'Shadow of the colossus',

      id: 8231,
      year: 2009,
      price: 50
    },
    {
      name: 'Dying Light',
      id: 9374,
      year: 2016,
      price: 40
    },
  ]
};


app.get('/games', (req, res) => {
  res.statusCode = 200;
  res.json(DB.games)
})

app.listen(8080, () => {
  console.log('API online!')
})