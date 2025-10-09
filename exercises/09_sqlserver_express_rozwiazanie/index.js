const express = require('express');
const { sql, poolPromise } = require('./db');
const app = express();
const port = 3000;

// Endpoint GET /users - pobiera wszystkich użytkowników
app.get('/users', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Users');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd połączenia z bazą');
  }
});

// Endpoint GET /addUser?name=Test&email=test@example.com - dodaje użytkownika
app.get('/addUser', async (req, res) => {
  const { name, email } = req.query;
  if (!name || !email) return res.status(400).send('Brak parametru name lub email');

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Name', sql.NVarChar, name)
      .input('Email', sql.NVarChar, email)
      .query('INSERT INTO Users (Name, Email) VALUES (@Name, @Email)');
    res.send(`Dodano użytkownika: ${name}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd dodawania użytkownika');
  }
});

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
