// app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/api.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());

// 1. Настраиваем мидлвар сессий
app.use(session({
  secret: process.env.SESSION_SECRET || 'super-secret-key-for-arsen',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, // Сессия живет 1 день
    httpOnly: true 
  }
}));

// 2. Проверка пароля админа
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || '12345'; // Дефолтный пароль, если нет в .env

  if (password === adminPassword) {
    req.session.isAdmin = true; // Запоминаем, что админ вошел
    return res.json({ success: true });
  } else {
    return res.status(401).json({ error: 'Неверный пароль' });
  }
});

// 3. Проверка статуса авторизации (для фронтенда)
app.get('/api/auth/status', (req, res) => {
  if (req.session.isAdmin) {
    return res.json({ isAdmin: true });
  }
  return res.json({ isAdmin: false });
});

// 4. Защита статичного файла admin.html от неавторизованных пользователей
app.get('/admin.html', (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.redirect('/#auth-required'); // Перенаправляем на главную, если не админ
  }
  next();
});

// Отдаем остальные публичные статичные файлы (index.html, style.css)
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем разделенные роуты API
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер: http://localhost:${PORT}`));
