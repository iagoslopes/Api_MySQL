const mysql = require('mysql2/promise');

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'mysql-host', // Use o nome do host do seu contêiner MySQL
      user: 'root',
      password: 'password',
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS mydb');
    console.log('Banco de dados criado com sucesso.');

    connection.close();
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
  }
}

async function createTables() {
  try {
    const connection = await mysql.createConnection({
      host: 'mysql-host', // Use o nome do host do seu contêiner MySQL
      user: 'root',
      password: 'password',
      database: 'mydb',
    });

  
     await connection.query(`
       CREATE TABLE IF NOT EXISTS users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
           email VARCHAR(255) NOT NULL
       )
     `);

    console.log('Tabelas criadas com sucesso.');

    connection.close();
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  }
}

async function deployApp() {
  try {
    // Coloque aqui o código de implantação do aplicativo Node.js,
    // por exemplo, criar um contêiner Docker, iniciar o aplicativo, etc.
    console.log('Implantação do aplicativo Node.js concluída.');
  } catch (error) {
    console.error('Erro na implantação do aplicativo Node.js:', error);
  }
}

// Chame as funções na ordem desejada
createDatabase()
  .then(() => createTables())
  .then(() => deployApp())
  .catch((error) => console.error('Erro geral:', error));
