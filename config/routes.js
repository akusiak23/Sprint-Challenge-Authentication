const axios = require('axios');
const bcrypt = require('bcrypt');
const { authenticate ,jwtKey, jwt } = require('./middlewares');

const db = require('../database/dbConfig');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

generateToken = (user) => {
  const payload = {
    username: user.username
  }
  const options = {
    expiresIn: '24h',
    subject: user.id.toString()
  }
  return jwt.sign(payload, jwtKey, options);
}

function register(req, res) {
  // implement user registration
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 14);
  newUser.password = hash;

  db('users')
    .insert(newUser)
    .then(id => {
      const userId = id[0];
      db('users')
        .where({ id: userId })
        .then(response => {
          const token = generateToken(response[0]);
          res.status(201).json(token);
        })
        .catch(err => {
          res.status(500).json(err)
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
