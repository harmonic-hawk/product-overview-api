const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const db = pgp('postgres://postgres@localhost:5432/mydb');

module.exports = db;

// const { Client } = require('pg');

// const client = new Client({
//   user: 'chrisschuhmacher',
//   host: 'localhost',
//   database: 'mydb',
//   password: '',
//   port: 5432,
// });

// client.connect();

// client.query('SELECT * FROM product WHERE id = 1', (result, err) => {
//   if (err) {
//     console.log('error!', err);
//   } else {
//     console.log('connected!');
//     client.end();
//   }
// });

// const res = client.query('SELECT $1::text as message', ['Hello world!'])
// res
//   .then((results) => {
//     console.log(results.rows[0].message); // Hello world!
//   })
//   .catch((err) => {
//     console.log(err);
//   });
