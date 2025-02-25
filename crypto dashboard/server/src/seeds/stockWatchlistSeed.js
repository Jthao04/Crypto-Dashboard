import sequelize from '../config/connection.js';
import StockWatchlist from '../models/StockWatchlist.js';

const seedStockWatchlist = async () => {
  await sequelize.sync({ force: true }); // Synchronize the database

  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', open: 150, high: 155, low: 148, close: 152, volume: 50000000, time: new Date() },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', open: 2800, high: 2850, low: 2750, close: 2820, volume: 3000000, time: new Date() },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', open: 3400, high: 3450, low: 3350, close: 3420, volume: 4000000, time: new Date() },
  ];

  for (const stock of stocks) {
    await StockWatchlist.create(stock);
  }

  console.log('Stock Watchlist seeded!');
  process.exit(0); // Exit the process after seeding
};

export default seedStockWatchlist;