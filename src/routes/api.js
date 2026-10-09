// src/routes/api.js
import express from 'express';
import { createLead, getLeads } from '../controllers/leadController.js';

const router = express.Router();

// Подача заявки открыта для всех
router.post('/contact', createLead);

// Получение заявок доступно только авторизованному админу
router.get('/leads', (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: 'Доступ запрещен. Требуется авторизация.' });
  }
  next();
}, getLeads);

export default router;
