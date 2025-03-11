import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Render requires SSL for external DB connections
    },
  },
  logging: false, // Disable logging for cleaner output
});

export default sequelize;