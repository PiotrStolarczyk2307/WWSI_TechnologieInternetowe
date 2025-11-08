const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const orderController = require('../controllers/orderController');
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.getCart);
router.post('/cart/add', cartController.addItem);
router.patch('/cart/item', cartController.updateItem);
router.delete('/cart/item/:id', cartController.deleteItem);
router.delete('/cart/clear', cartController.clearCart);

router.post('/checkout', checkoutController.checkout);
router.get('/orders', orderController.getOrders);

module.exports = router;
