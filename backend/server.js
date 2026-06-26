require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// ── Configuração do CORS ────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173' // ajuste conforme seu front-end
}));

// ── Middleware para JSON ────────────────────────────────
app.use(express.json());

// ── Rate Limiter (apenas para login e registro) ─────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 150,                  // máximo de 10 requisições
  message: { error: 'Muitas tentativas. Aguarde 15 minutos.' }
});

// Aplica o limiter só nas rotas críticas
app.use('/auth/login', limiter);
app.use('/auth/register', limiter);

// ── Rotas principais ───────────────────────────────────
app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ── Inicialização do servidor ──────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
