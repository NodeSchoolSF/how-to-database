exports.up = function (knex) {
  return Promise.all([
    knex.schema.raw(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price DECIMAL NOT NULL
      );
    `),
    knex.schema.raw(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL
      );
    `),
    knex.schema.raw(`
      CREATE TABLE wishlists (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        name TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id)
      );
    `),
    knex.schema.raw(`
      CREATE TABLE wishlist_products (
        wishlist_id INTEGER REFERENCES wishlists(id),
        product_id INTEGER REFERENCES products(id)
      );
    `),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.raw(`DROP TABLE wishlist_products`),
    knex.schema.raw(`DROP TABLE wishlists`),
    knex.schema.raw(`DROP TABLE users`),
    knex.schema.raw(`DROP TABLE products`),
  ]);
};
