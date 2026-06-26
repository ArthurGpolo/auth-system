const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { register, login, getProfile } = require('../controllers/authController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// ── ROTAS DE AUTENTICAÇÃO ───────────────────────────────
router.post('/register', register);
router.post('/login', login);
router.get('/profile', requireAuth, getProfile);

// ── ROTAS DE ADMINISTRAÇÃO ──────────────────────────────

// Listar todos os usuários
router.get('/users', requireAuth, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

// Atualizar role de um usuário
router.put('/users/:id', requireAuth, requireAdmin, async (req, res) => {
  const { role } = req.body;
  try {
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id]);
    res.json({ message: 'Permissão atualizada!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar permissões.' });
  }
});

module.exports = router;
