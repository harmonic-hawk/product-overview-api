-- 1. Create database
DROP DATABASE IF EXISTS mydb;

CREATE DATABASE mydb;

-- connect to new database
\c mydb;

-- 2. Create schema
CREATE SCHEMA IF NOT EXISTS product_overview;

-- Set search path to use schema
SET search_path TO product_overview, public;

-- 3. Create tables

/* Table 'product' */
CREATE TABLE product(
  id integer NOT NULL,
  "name" varchar(30) NOT NULL,
  slogan varchar(255) NOT NULL,
  description varchar(512) NOT NULL,
  category varchar(30) NOT NULL,
  default_price varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'feature' */
CREATE TABLE feature(
  id integer NOT NULL,
  product_id integer NOT NULL,
  feature varchar(64) NOT NULL,
  "value" varchar(64),
  PRIMARY KEY(id)
);

/* Table 'style' */
CREATE TABLE style(
  id integer NOT NULL,
  product_id integer NOT NULL,
  "name" varchar(30) NOT NULL,
  sale_price varchar(30),
  original_price varchar(30) NOT NULL,
  "default" boolean NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'sku' */
CREATE TABLE sku(
  id integer NOT NULL,
  style_id integer NOT NULL,
  size varchar NOT NULL,
  quantity integer,
  PRIMARY KEY(id)
);

/* Table 'photo' */
CREATE TABLE photo(
  id integer NOT NULL,
  style_id integer NOT NULL,
  url varchar,
  thumbnail_url varchar,
  PRIMARY KEY(id)
);

/* Table 'cart' */
CREATE TABLE cart(
  id integer NOT NULL,
  user_session integer NOT NULL,
  product_id integer NOT NULL,
  active integer NOT NULL,
  PRIMARY KEY(id)
);

/* Relation 'product_feature' */
ALTER TABLE feature
  ADD CONSTRAINT product_feature FOREIGN KEY (product_id) REFERENCES product (id)
  ;

/* Relation 'product_style' */
ALTER TABLE style
  ADD CONSTRAINT product_style FOREIGN KEY (product_id) REFERENCES product (id);

/* Relation 'style_sku' */
ALTER TABLE sku
  ADD CONSTRAINT style_sku FOREIGN KEY (style_id) REFERENCES style (id);

/* Relation 'style_photo' */
ALTER TABLE photo
  ADD CONSTRAINT style_photo FOREIGN KEY (style_id) REFERENCES style (id);

/* Relation 'product_cart' */
ALTER TABLE cart
  ADD CONSTRAINT product_cart FOREIGN KEY (product_id) REFERENCES product (id);