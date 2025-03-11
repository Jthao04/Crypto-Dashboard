import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize from './config/connection.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import './models/CryptoWatchlist.js';
import './models/StockWatchlist.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();


app.use(cors());
app.use(express.static('../client/dist'));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api', protectedRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connected!');
  });
});