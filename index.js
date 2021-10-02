const express = require('express');
const db = require('./db/mydb');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/products', (req, res) => {
  // Test connection here
  db.any('SELECT * FROM product LIMIT 50')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(404).send(new Error(err));
    });
});

app.get('/products/:product_id', (req, res) => {
  const pid = req.params.product_id;
  const query = `SELECT * FROM product WHERE id=${pid}`;

  db.oneOrNone(query)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      // log error here
      res.sendStatus(404).send(new Error(err));
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  res.send(`get styles by product id : ${req.params.product_id}`);
});

app.get('/products/:product_id/related', (req, res) => {
  const pid = req.params.product_id;

  db.any(`SELECT * from related WHERE product_id=${pid}`)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(404).send(new Error(err));
    });
});

app.get('/cart', (req, res) => {
  res.send('get all products in cart');
});

app.post('/cart', (req, res) => {
  res.send('post an item to the cart');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is now listening on Port ${port}`);
});
