const Order = require('../models/orderModel');

exports.getOrders = (req, res) => {
  Order.getOrders((err, orders) => {
    if (err) return res.status(500).json({ error: 'Błąd przy pobieraniu zamówień' });
    res.json(orders);
  });
};
