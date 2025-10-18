const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', (req, res) => {
  const { author } = req.query;
  let books = db.books.map(book => {
    const activeLoans = db.loans.filter(l => l.book_id === book.id && l.return_date === null).length;
    return { ...book, available: book.copies - activeLoans };
  });
  if (author) {
    books = books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  }
  res.json(books);
});

router.post('/', (req, res) => {
  const { title, author, copies = 1 } = req.body;
  const newBook = { id: db.nextId.book++, title, author, copies };
  db.books.push(newBook);
  res.status(201).json(newBook);
});

module.exports = router;
