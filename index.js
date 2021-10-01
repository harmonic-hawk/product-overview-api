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
  res.send('get all products');
});

app.get('/products/:product_id', (req, res) => {
  res.send(`get product by product id : ${req.params.product_id}`);
});

app.get('/products/:product_id/styles', (req, res) => {
  res.send(`get styles by product id : ${req.params.product_id}`);
});

app.get('/products/:product_id/related', (req, res) => {
  res.send(`get related products ids by product id : ${req.params.product_id}`);
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
