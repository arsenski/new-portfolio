import { Lead } from '../models/lead.js';

export const createLead = async (req, res) => {
  const { name, contact, tariff, comment } = req.body;

  if (!name || !contact || !tariff) {
    return res.status(400).json({ error: 'Заполните обязательные поля.' });
  }

  try {
    await Lead.create({ name, contact, tariff, comment });

    const message = [
      `УВЕДОМЛЕНИЕ: Новая заявка с сайта`,
      `----------------------------------------`,
      `Имя клиента: ${name}`,
      `Контакты: ${contact}`,
      `Выбранный тариф: ${tariff}`,
      `Комментарий: ${comment || 'Не указан'}`,
      `----------------------------------------`
    ].join('\n');

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (botToken && chatId) {
      await fetch(`https://telegram.org{botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message })
      });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(leads);
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка сервера при получении данных.' });
  }
};
