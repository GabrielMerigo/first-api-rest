const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DB = {
  games: [
    {
      name: 'GTA V',
      id: 1,
      year: 2013,
      price: 100
    },
    {
      name: 'Shadow of the colossus',
      id: 2,
      year: 2009,
      price: 50
    },
    {
      name: 'Dying Light',
      id: 3,
      year: 2016,
      price: 40
    },
  ]
};

const getGame = id => DB.games.find(game => game.id === id);

app.get('/games', (req, res) => {
  res.statusCode = 200;
  res.json(DB.games)
})

app.get('/game/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400)
  } else {
    const game = getGame(id);

    if (!game) {
      res.sendStatus(404)
    } else {
      res.json(game)
    }
  }

});

app.post('/game', (req, res) => {
  const { name, year, price, id } = req.body;

  if (name && year && price) {
    DB.games.push({
      id,
      name,
      year,
      price
    })

    res.sendStatus(200)
  }else{
    res.sendStatus(400)
  }
});

app.delete('/game/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if(isNaN(id)){
    res.sendStatus(400)
  }else{
    const newGames = DB.games.filter(game => game.id !== id);
    DB.games = newGames;
    res.sendStatus(200)
  }
});

app.put('/game/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400)
  } else {
    const game = getGame(id);
    const { name, year, price } = req.body;

    if (!game) {
      res.sendStatus(404)
    } else {  
      if (name) game.name = name;
      if (year) game.year = year;
      if (price) game.price = price;

      res.sendStatus(200)
    }
  }
})

app.listen(8080, () => {
  console.log('API online!')
})