const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const Coupon = require('../models/couponModel');

exports.checkout = (req, res) => {
  const code = req.body.coupon_code || '';

  Cart.getCart((err, items) => {
    if (err || !Array.isArray(items) || items.length === 0 || !items.some(i => i.amount > 0)) {
      return res.status(400).json({ error: 'Koszyk jest pusty' });
    }

    Coupon.getDiscount(code, (err, discount) => {
      if (err) discount = 0;

      Order.createOrder(items, discount, (err, orderId, total) => {
        if (err) return res.status(500).json({ error: 'Błąd przy tworzeniu zamówienia' });

        Cart.clearCart(() => {
          res.status(201).json({ order_id: orderId, total });
        });
      });
    });
  });
};
