const db = require('../db/database');

exports.getDiscount = (code, cb) => {
  db.get('SELECT discount FROM coupons WHERE code = ?', [code], (err, row) => {
    if (err) return cb(err);
    cb(null, row ? row.discount : 0);
  });
};
