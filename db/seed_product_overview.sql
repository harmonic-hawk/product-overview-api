-- Seed the database from csv files

COPY product
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/db/csv/product.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY feature
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/db/csv/features.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY style
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/db/csv/styles.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY sku
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/db/csv/skus.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY photo
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/db/csv/photos.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY cart
FROM '/Users/chrisschuhmacher/Desktop/hr-sf0137/sdc-catwalk/product-overview-api/db/csv/cart.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');
