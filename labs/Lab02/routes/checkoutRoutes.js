const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.post('/', (req, res) => {
  const coupon = req.body?.coupon_code || '';

  db.all(`
    SELECT cart_items.product_id, products.price, cart_items.amount
    FROM cart_items
    JOIN products ON cart_items.product_id = products.id
  `, (err, items) => {
    if (err || items.length === 0) return res.status(400).json({ error: 'Koszyk jest pusty' });

    db.get('SELECT discount FROM coupons WHERE code = ?', [coupon], (err, row) => {
      const discount = row ? row.discount : 0;
      const total = items.reduce((sum, i) => sum + i.price * i.amount, 0);
      const finalTotal = Math.round(total * (1 - discount) * 100) / 100;

      db.run('INSERT INTO orders (total) VALUES (?)', [finalTotal], function (err) {
        if (err) return res.status(500).json({ error: 'Błąd zamówienia' });
        const orderId = this.lastID;

        const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, amount, price) VALUES (?, ?, ?, ?)');
        items.forEach(i => stmt.run(orderId, i.product_id, i.amount, i.price));
        stmt.finalize(() => {
          db.run('DELETE FROM cart_items');
          res.status(201).json({ order_id: orderId, total: finalTotal });
        });
      });
    });
  });
});

module.exports = router;
