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
  const query = 'SELECT * FROM product LIMIT 50';
  // Test connection here
  db.any(query)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(404).send(new Error(err));
    });
});

app.get('/products/:product_id', (req, res) => {
  const pid = req.params.product_id;
  const query = 'SELECT * FROM product WHERE id = $1';

  db.oneOrNone(query, pid)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      // log error here
      res.sendStatus(404).send(new Error(err));
    });
});

app.get('/products/:product_id/styles', async (req, res) => {
  const pid = req.params.product_id;

  db.task((t) =>
    // execute a chain of queries against the task context, and return the result:
    t.any('SELECT * FROM style WHERE product_id = $1', pid)
      .then((results) => {
        const promises = results.map((style) => db.any('SELECT * FROM photo WHERE style_id = $1', style.id)
          .then((photos) => {
            const temp = style;
            temp.photos = photos;
            return style;
          }));

        return Promise.all(promises).then((values) => values);
      }))
    .then((results) => {
      const promises = results.map((style) => db.any('SELECT * FROM sku WHERE style_id = $1', style.id)
        .then((skus) => {
          const temp = style;
          temp.skus = skus;
          return temp;
        }));

      return Promise.all(promises).then((values) => values);
    })
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err);
    });
});

app.get('/products/:product_id/related', (req, res) => {
  const pid = req.params.product_id;
  // Limit related ids to 20
  db.manyOrNone(`SELECT id FROM product WHERE category IN (SELECT category FROM product WHERE id=${pid}) LIMIT 20`)
    .then((results) => {
      const ids = results.map((item) => item.id);

      res.send(ids);
    })
    .catch((err) => console.log(err));
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
