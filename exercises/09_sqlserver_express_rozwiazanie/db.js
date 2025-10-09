const sql = require('mssql/msnodesqlv8');

const config = {
  server: 'localhost\\SQLEXPRESS',   // tylko nazwa komputera, bez \SQLEXPRESS jeśli jest domyślna instancja
  database: 'DemoDB',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,   // używa bieżącego konta Windows
    encrypt: false
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Połączono z SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Błąd połączenia z bazą danych:', JSON.stringify(err, null, 2));
  });

module.exports = {
  sql,
  poolPromise
};



