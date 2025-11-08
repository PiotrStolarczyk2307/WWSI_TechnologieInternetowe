const Product = require('../models/productModel');

exports.getAll = (req, res) => {
  Product.getAll((err, rows) => res.json(rows));
};

exports.create = (req, res) => {
  Product.create(req.body, () => res.status(201).send());
};
