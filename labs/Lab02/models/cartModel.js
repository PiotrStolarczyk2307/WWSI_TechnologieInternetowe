const db = require('../db/database');

exports.getCart = (cb) => {
  db.all(`
    SELECT cart_items.id, products.id AS product_id, products.name, products.price, cart_items.amount
FROM cart_items
JOIN products ON cart_items.product_id = products.id
WHERE cart_items.amount > 0
  `, (err, rows) => {
    if (err) {
      console.error('[CART] Błąd przy pobieraniu koszyka:', err);
      return cb(err, null);
    }

    console.log('[CART] Zawartość koszyka:', rows);
    cb(null, Array.isArray(rows) ? rows : []);
  });
};

exports.addItem = (item, cb) => {
  db.run('INSERT INTO cart_items (product_id, amount) VALUES (?, ?)', [item.product_id, item.amount], cb);
};

exports.updateItem = (id, amount, cb) => {
  db.run('UPDATE cart_items SET amount = ? WHERE id = ?', [amount, id], cb);
};

exports.deleteItem = (id, cb) => {
  db.run('DELETE FROM cart_items WHERE id = ?', [id], cb);
};

exports.clearCart = (cb) => {
  db.run('DELETE FROM cart_items', cb);
};
