SET check_function_bodies = false;

/* Table 'products' */
CREATE TABLE products(
  id integer NOT NULL,
  "name" varchar(30) NOT NULL,
  slogan varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  category varchar(30) NOT NULL,
  default_price varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'features' */
CREATE TABLE features(
  id integer NOT NULL,
  feature varchar(64) NOT NULL,
  "value" varchar(64) NOT NULL,
  products_id integer NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'styles' */
CREATE TABLE styles(
  id integer NOT NULL,
  "name" varchar(30) NOT NULL,
  original_price varchar(30) NOT NULL,
  sale_price varchar(30),
  "default" boolean NOT NULL,
  products_id integer NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'skus' */
CREATE TABLE skus(
  id integer NOT NULL,
  size varchar(3) NOT NULL,
  quantity integer,
  styles_id integer NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'photos' */
CREATE TABLE photos(
  id integer NOT NULL,
  thumbnail_url varchar(100) NOT NULL,
  url varchar(100),
  styles_id integer NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'ratings' */
CREATE TABLE ratings(
  id integer NOT NULL,
  one_star integer,
  two_star integer,
  three_star integer,
  four_star integer,
  five_star integer,
  products_id integer NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'cart_items' */
CREATE TABLE cart_items(
  id integer NOT NULL,
  sku_id integer NOT NULL,
  count integer NOT NULL,
  PRIMARY KEY(id)
);

/* Relation 'products_features' */
ALTER TABLE features
  ADD CONSTRAINT products_features
    FOREIGN KEY (products_id) REFERENCES products (id);

/* Relation 'products_styles' */
ALTER TABLE styles
  ADD CONSTRAINT products_styles
    FOREIGN KEY (products_id) REFERENCES products (id);

/* Relation 'styles_photos' */
ALTER TABLE photos
  ADD CONSTRAINT styles_photos FOREIGN KEY (styles_id) REFERENCES styles (id);

/* Relation 'styles_skus' */
ALTER TABLE skus
  ADD CONSTRAINT styles_skus FOREIGN KEY (styles_id) REFERENCES styles (id);

/* Relation 'products_ratings' */
ALTER TABLE ratings
  ADD CONSTRAINT products_ratings
    FOREIGN KEY (products_id) REFERENCES products (id);
