const initOptions = { schema: 'product_overview' };
const pgp = require('pg-promise')(initOptions);

const db = pgp('postgres://postgres@localhost:5432/mydb');

module.exports = db;
