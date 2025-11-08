const db = require('../db/database');

exports.getAll = (cb) => {
  db.all('SELECT * FROM products', cb);
};

exports.create = (product, cb) => {
  db.run('INSERT INTO products (name, price) VALUES (?, ?)', [product.name, product.price], cb);
};
