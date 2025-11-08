const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({ error: 'Błąd produktów' });
    res.json(rows);
  });
});

module.exports = router;



