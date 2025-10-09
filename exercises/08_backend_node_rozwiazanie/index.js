// Importujemy bibliotekę Express
const express = require('express');

// Tworzymy instancję aplikacji
const app = express();

// Ustalamy port, na którym serwer będzie działał
const PORT = 3000;

// Endpoint główny - "/" → zwraca komunikat "Serwer działa"
app.get('/', (req, res) => {
  res.send('Serwer działa');
});

// Endpoint "/time" → zwraca aktualną datę i godzinę
app.get('/time', (req, res) => {
  const now = new Date();
  res.send(`Aktualna data i godzina: ${now.toString()}`);
});

// Endpoint "/hello" z parametrem query "?name=Piotr"
app.get('/hello', (req, res) => {
  const name = req.query.name || 'Gość'; // Jeśli brak parametru, domyślnie Gość
  res.send(`Hello, ${name}`);
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`✅ Serwer działa na porcie ${PORT}`);
});