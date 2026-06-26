-- Criação do banco
CREATE DATABASE auth_db;
USE auth_db;

-- Tabela de usuários
CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)         NOT NULL,
  email      VARCHAR(150) UNIQUE  NOT NULL,
  password   TEXT                 NOT NULL,
  role       ENUM('user','admin') DEFAULT 'user', -- campo novo
  created_at TIMESTAMP            DEFAULT CURRENT_TIMESTAMP
);

-- Exemplo de tabela de logs (opcional, para registrar ações de admin)
CREATE TABLE admin_logs (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  admin_id   INT NOT NULL,
  action     VARCHAR(255) NOT NULL,
  target_id  INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id),
  FOREIGN KEY (target_id) REFERENCES users(id)
);

UPDATE users SET role = 'admin' WHERE email = 'admin@email.com';

SELECT * FROM users;
SELECT * FROM admin_logs;