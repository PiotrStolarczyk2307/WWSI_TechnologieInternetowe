const Cart = require('../models/cartModel');

exports.getCart = (req, res) => {
  Cart.getCart((err, rows) => res.json(rows));
};

exports.addItem = (req, res) => {
  Cart.addItem(req.body, () => res.status(201).send());
};

exports.updateItem = (req, res) => {
  Cart.updateItem(req.params.id, req.body.amount, () => res.send());
};

exports.deleteItem = (req, res) => {
  Cart.deleteItem(req.params.id, () => res.send());
};
