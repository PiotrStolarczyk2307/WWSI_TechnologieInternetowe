const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL CHECK(price >= 0)
  )`);

  db.run(`INSERT INTO products (name, price) VALUES 
    ('Laptop', 3000),
    ('Telefon', 2000)
  `);

  db.run(`CREATE TABLE cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    amount INTEGER CHECK(amount > 0)
  )`);

  db.run(`CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    total REAL
  )`);

  db.run(`CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    amount INTEGER CHECK(amount > 0),
    price REAL
  )`);

  db.run(`CREATE TABLE coupons (
    code TEXT PRIMARY KEY,
    discount REAL CHECK(discount >= 0 AND discount <= 1)
  )`);

  db.run(`INSERT INTO coupons (code, discount) VALUES 
    ('RABAT10', 0.1),
    ('RABAT20', 0.2)
  `);
});

module.exports = db;
