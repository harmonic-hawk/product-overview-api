/* eslint-disable */
const initOptions = {};

const pgp = require('pg-promise')(initOptions);

const db = pgp('postgres://postgres:catwalk:@localhost:5432/mydb');

db.connect()
  .then((obj) => console.log('Connected to PostgreSQL!'))
  .catch((err) => console.log(err));

module.exports = db;
