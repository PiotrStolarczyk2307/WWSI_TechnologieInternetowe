const db = require('../db/database');

exports.createOrder = (items, discount = 0, cb) => {
  // Oblicz sumę zamówienia
  const sum = items.reduce((acc, item) => acc + item.price * item.amount, 0);
  const total = Math.round(sum * (1 - discount) * 100) / 100;

  if (total <= 0) {
    console.warn('[ORDER] Suma zamówienia wynosi 0 — zamówienie nie zostanie utworzone');
    return cb(new Error('Suma zamówienia wynosi 0'), null, null);
  }

  // Zapisz zamówienie
  db.run('INSERT INTO orders (created_at, total) VALUES (?, ?)', [new Date().toISOString(), total], function (err) {
    if (err) {
      console.error('[ORDER] Błąd przy dodawaniu zamówienia:', err);
      return cb(err);
    }

    const orderId = this.lastID;
    console.log('[ORDER] Zamówienie zapisane, ID:', orderId, 'Total:', total);

    let pending = items.length;
    items.forEach(item => {
      console.log('[ORDER] Dodaję pozycję:', item);
      db.run(
        'INSERT INTO order_items (order_id, product_id, amount, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.amount, item.price],
        (err) => {
          if (err) console.error('[ORDER] Błąd przy dodawaniu pozycji:', err);
          pending--;
          if (pending === 0) {
            console.log('[ORDER] Wszystkie pozycje dodane');
            cb(null, orderId, total);
          }
        }
      );
    });
  });
};
