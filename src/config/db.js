import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

sequelize.sync({ alter: true })
  .then(() => console.log('База данных Postgres синхронизирована.'))
  .catch(err => console.error('Ошибка синхронизации БД:', err));
