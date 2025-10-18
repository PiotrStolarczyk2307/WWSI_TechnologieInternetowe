const express = require('express');
const app = express();
app.use(express.json());

app.use(express.static('public'))

app.use('/api/members', require('./routes/members'));
app.use('/api/books', require('./routes/books'));
app.use('/api/loans', require('./routes/loans'));

app.listen(3000, () => {
  console.log('📚 Serwer wypożyczalni działa na http://localhost:3000');
});
