// app.js
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = $PORT || 3000;

app.use(express.json());

const dbConfig = {
  host: 'mysql-host', // Use o nome do host do seu contêiner MySQL
  user: 'root',
  password: 'password',
  database: 'mydb',
};

async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

app.get('/api/users', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

app.listen(port, () => {
  console.log(`Aplicativo está ouvindo na porta ${port}`);
});
