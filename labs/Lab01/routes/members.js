const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', (req, res) => {
  res.json(db.members);
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (db.members.find(m => m.email === email)) {
    return res.status(409).json({ error: 'Email już istnieje' });
  }
  const newMember = { id: db.nextId.member++, name, email };
  db.members.push(newMember);
  res.status(201).location(`/api/members/${newMember.id}`).json(newMember);
});

module.exports = router;