const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

const db = require('./models');
const apiPokemon = require('./routes/pokemon');

apiPokemon(app, db);

app.get('/', (req, res) => {
  res.send("Welcome to Gabriel's test");
});

const PORT = 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line prefer-template
  console.log('listening on port' + PORT);
});
