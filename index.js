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
      console.log('error:: ', err);
      res.sendStatus(404).send(new Error(err));
    });
});

app.get('/products/:product_id', (req, res) => {
  const pid = req.params.product_id;
  const query = `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, json_agg(json_build_object('feature', f.feature, 'value', f.value)) AS features
                 FROM feature f INNER JOIN product p ON f.product_id = p.id WHERE p.id = $1 GROUP BY p.id;`;

  db.any(query, pid)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.sendStatus(404).send(new Error(err)));
});

app.get('/products/:product_id/styles', async (req, res) => {
  const pid = req.params.product_id;
  const query = `SELECT s.id, s.name, s.sale_price, s.original_price, s.default AS "default?",
  json_agg(json_build_object('url', p.url, 'thumbnail_url', p.thumbnail_url)) AS photos,
  json_object_agg(sku.id, json_build_object('size', sku.size, 'quantity', sku.quantity)) AS skus
  FROM style s
  INNER JOIN sku sku ON s.id = sku.style_id
  INNER JOIN photo p ON s.id = p.style_id
  WHERE s.product_id = $1 GROUP BY s.id`;

  db.any(query, pid)
    .then((data) => {
      res.send({
        product_id: pid,
        results: data,
      });
    })
    .catch((err) => res.sendStatus(404).send(new Error(err)));
});

app.get('/products/:product_id/related', (req, res) => {
  const pid = req.params.product_id;
  // Limit related ids to 20
  db.any(`SELECT id FROM product WHERE category IN (SELECT category FROM product WHERE id=${pid}) LIMIT 20`)
    .then((results) => {
      const ids = results.map((item) => item.id);

      res.send(ids);
    })
    .catch((err) => console.log(err));
});

app.get('/cart', (req, res) => {
  const { sessionId } = req.query;

  const query = 'SELECT product_id AS sku_id, COUNT(product_id) AS count FROM cart WHERE user_session = $1 GROUP BY product_id';

  db.any(query, sessionId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.sendStatus(404).send(new Error(err)));
});

app.post('/cart', (req, res) => {
  res.send('post an item to the cart');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is now listening on Port ${port}`);
});
