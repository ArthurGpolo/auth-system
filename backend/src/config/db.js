const mysql = require('mysql2/promise'); // versão com async/await
require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,  // aguarda conexão disponível no pool
  connectionLimit: 10,       // máximo de conexões simultâneas
  queueLimit: 0              // fila ilimitada de requisições
});

// Testa a conexão
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('MySQL conectado!');
    conn.release(); // devolve a conexão para o pool
  } catch (err) {
    console.error('Erro ao conectar no MySQL:', err.message);
  }
}

testConnection();

module.exports = pool;