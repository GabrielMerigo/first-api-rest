const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const JWTSecret = "mykey"

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
  ],
  users: [
    {
      id: 1,
      name: 'Gabriel',
      email: 'gabismerigo@gmail.com',
      password: '123456'
    },
    {
      id: 1,
      name: 'Izadora',
      email: 'Izadora@gmail.com',
      password: 'Izadora1234'
    }
  ]
};

const getGame = id => DB.games.find(game => game.id === id);

function auth(req, res, next){
  const authToken = req.headers.authorization
  const tokenWithBearer = String(req.headers.authorization).replace('Bearer ', '');

  if(authToken){
    jwt.verify(tokenWithBearer, JWTSecret, (err, data) => {
      if(err){
        res.status(401)
        res.json({err:  'Invalid Token'})
      }else{
        req.token = tokenWithBearer;
        req.loggedUser = { id: data.id, email: data.email }
        next();
      }
    });
  }else{
    res.status = 401;
    res.json({err:  'Invalid Token'});
  }
}

app.get('/games', auth, (req, res) => {
  res.statusCode = 200;
  res.json(DB.games)
});

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

app.post('/game', auth, (req, res) => {
  const { name, year, price, id } = req.body;

  if (name && year && price) {
    DB.games.push({
      id,
      name,
      year,
      price
    })

    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
});

app.delete('/game/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400)
  } else {
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

app.post('/auth', (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.status(400), res.json({ err: 'Invalid E-mail' })

  const user = DB.users.find(user => user.email === email);

  if(user?.password){
    if(user.password === password){
      jwt.sign({
        id: user.id,
        email: user.email
      }, JWTSecret, { expiresIn: '48h' }, (err, token) => {
        if(err){
          res.status(400); // 
          res.json({ token: "Falha interna" });
        }else{
          res.status(202); // Success
          res.json({ token });
        }
      })
    }else{
      res.status(401); // Not allowed
      res.json({ err: "Invalid credentials!" });
    }
  
  }else{
    res.status(404); // Not found
    res.json({ err: "Email doesn't exists in DB."});
  }
})

app.listen(8000, () => {
  console.log('API online!')
})