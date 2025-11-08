const express = require('express');
const path = require('path');
const productRoutes = require('../routes/productRoutes');
const cartRoutes = require('../routes/cartRoutes');
const checkoutRoutes = require('../routes/checkoutRoutes');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
