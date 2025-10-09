const express = require('express');
const sql = require('mssql');

const config = {
    server: 'localhost',
    database: 'DemoDB',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

const app = express();
const port = 3000;

let pool;

sql.connect(config)
    .then(p => {
        pool = p;
        console.log('Połączono z SQL Server (Windows Authentication)');
    })
    .catch(err => console.log('Błąd połączenia:', err));

app.get('/users', async (req, res) => {
    try {
        const result = await pool.request().query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/addUser', async (req, res) => {
    const { name, email } = req.query;
    if (!name || !email) return res.status(400).send('Brak parametru name lub email');

    try {
        await pool.request()
            .input('Name', sql.NVarChar, name)
            .input('Email', sql.NVarChar, email)
            .query('INSERT INTO Users (Name, Email) VALUES (@Name, @Email)');
        res.send(`Dodano użytkownika: ${name}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});


