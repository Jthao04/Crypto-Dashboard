import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import sequelize from './config/connection.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import './models/CryptoWatchlist.js'; // Import the CryptoWatchlist model
import './models/StockWatchlist.js'; // Import the StockWatchlist model

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors()); // Enable CORS

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connected!');
  });
});