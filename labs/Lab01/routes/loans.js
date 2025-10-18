const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', (req, res) => {
  const loans = db.loans.map(loan => {
    const member = db.members.find(m => m.id === loan.member_id);
    const book = db.books.find(b => b.id === loan.book_id);
    return {
      ...loan,
      member_name: member?.name,
      book_title: book?.title
    };
  });
  res.json(loans);
});

router.post('/borrow', (req, res) => {
  const { member_id, book_id, days = 14 } = req.body;
  const book = db.books.find(b => b.id === book_id);
  const member = db.members.find(m => m.id === member_id);
  if (!book || !member) return res.status(400).json({ error: 'Nieprawidłowy member_id lub book_id' });

  const activeLoans = db.loans.filter(l => l.book_id === book_id && l.return_date === null).length;
  if (activeLoans >= book.copies) {
    return res.status(409).json({ error: 'Brak dostępnych egzemplarzy' });
  }

  const today = new Date().toISOString().split('T')[0];
  const dueDate = new Date(Date.now() + days * 86400000).toISOString().split('T')[0];

  const newLoan = {
    id: db.nextId.loan++,
    member_id,
    book_id,
    loan_date: today,
    due_date: dueDate,
    return_date: null
  };
  db.loans.push(newLoan);
  res.status(201).json(newLoan);
});

router.post('/return', (req, res) => {
  const { loan_id } = req.body;
  const loan = db.loans.find(l => l.id === loan_id);
  if (!loan) return res.status(404).json({ error: 'Nie znaleziono wypożyczenia' });
  if (loan.return_date) return res.status(409).json({ error: 'Książka już zwrócona' });

  loan.return_date = new Date().toISOString().split('T')[0];
  res.json(loan);
});

router.get('/overdue', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const overdue = db.loans.filter(l => !l.return_date && l.due_date < today);
  res.json(overdue);
});

module.exports = router;
