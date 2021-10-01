-- Set search path to use schema
SET search_path TO product_overview, public;

COPY product
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/csv/product.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY feature
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/csv/features.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY style
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/csv/styles.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY sku
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/csv/skus.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY photo
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/csv/photos.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY cart
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/csv/cart.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');
