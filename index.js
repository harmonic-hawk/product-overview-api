require('newrelic');
const express = require('express');
const db = require('./db/mydb');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', (req, res) => {
  const query = 'SELECT * FROM product ORDER BY id LIMIT 50';

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
  const query = `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, json_agg(json_build_object('feature', f.feature, 'value', f.value)) AS features
                 FROM product p INNER JOIN feature f ON f.product_id = p.id WHERE p.id = $1 GROUP BY p.id`;

  db.any(query, pid)
    .then((data) => {
      // this returns an array with one item, only send the first item
      res.send(data[0]);
    })
    .catch((err) => res.sendStatus(404).send(new Error(err)));
});

app.get('/products/:product_id/styles', async (req, res) => {
  const pid = req.params.product_id;
  const query = `SELECT s.id, s.name, s.sale_price, s.original_price, s.default AS "default?", p.photos, sku.skus
  FROM style s
  LEFT JOIN LATERAL (
    SELECT jsonb_agg(jsonb_build_object('url', p.url, 'thumbnail_url', p.thumbnail_url)) AS photos
    FROM photo p
    WHERE s.id = p.style_id
  ) p ON true
  LEFT JOIN LATERAL (
    SELECT jsonb_object_agg(sku.id, jsonb_build_object('size', sku.size, 'quantity', sku.quantity)) AS skus
    FROM sku
    WHERE s.id = sku.style_id
  ) sku ON true
  WHERE s.product_id = $1 GROUP BY s.id, p.photos, sku.skus`;

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
  db.any(`SELECT id FROM product WHERE category IN (SELECT category FROM product WHERE id=${pid})`)
    .then((results) => {
      const ids = results.map((item) => item.id);

      res.send(ids);
    })
    .catch((err) => res.sendStatus(404).send(new Error(err)));
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
  const skuId = req.body.sku_id;
  const query = 'INSERT INTO cart(product_id, user_session, active) VALUES($1, 1234, 1)';

  db.none(query, skuId)
    .then(() => {
      res.send(`sku id ${skuId} has been added to the database.`);
    })
    .catch((err) => res.send(new Error(err)));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is now listening on Port ${port}`);
});
