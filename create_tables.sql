-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS mydb;

-- Usa o banco de dados
USE mydb;

-- Cria a tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

-- Outros comandos de criação de tabelas, se necessário
