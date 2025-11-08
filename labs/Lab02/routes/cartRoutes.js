const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/items', (req, res) => {
  db.all(`
    SELECT cart_items.product_id, products.name, products.price, cart_items.amount
    FROM cart_items
    JOIN products ON cart_items.product_id = products.id
  `, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Błąd koszyka' });
    res.json(rows);
  });
});

router.post('/items', (req, res) => {
  const { product_id, amount } = req.body;
  if (amount <= 0) return res.status(400).json({ error: 'Ilość musi być > 0' });

  db.get('SELECT id FROM cart_items WHERE product_id = ?', [product_id], (err, row) => {
    if (row) {
      db.run('UPDATE cart_items SET amount = amount + ? WHERE product_id = ?', [amount, product_id]);
    } else {
      db.run('INSERT INTO cart_items (product_id, amount) VALUES (?, ?)', [product_id, amount]);
    }
    res.json({ success: true });
  });
});

router.delete('/items/:id', (req, res) => {
  db.run('DELETE FROM cart_items WHERE product_id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ error: 'Błąd usuwania' });
    res.json({ success: true });
  });
});

module.exports = router;

