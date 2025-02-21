import sequelize from '../config/connection.js';
import StockWatchlist from '../models/StockWatchlist.js';

const seedStockWatchlist = async () => {
    await sequelize.sync({ force: true }); // Synchronize the database

    const stocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 150, change24h: 1.2, volume24h: 50000000, lastUpdated: new Date() },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800, change24h: 0.8, volume24h: 3000000, lastUpdated: new Date() },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3400, change24h: 1.5, volume24h: 4000000, lastUpdated: new Date() },
    ];

    for (const stock of stocks) {
        await StockWatchlist.create(stock);
    }

    console.log('Stock Watchlist seeded!');
    process.exit(0); // Exit the process after seeding
};

export default seedStockWatchlist;