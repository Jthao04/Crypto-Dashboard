import sequelize from '../config/connection.js';
import CryptoWatchlist from '../models/CryptoWatchlist.js';

const seedCryptoWatchlist = async () => {
    await sequelize.sync({ force: true }); // Synchronize the database

    const cryptos = [
        { symbol: 'BTC', name: 'Bitcoin', price: 45000, change24h: 2.5, volume24h: 35000000000, lastUpdated: new Date() },
        { symbol: 'ETH', name: 'Ethereum', price: 3000, change24h: 1.8, volume24h: 20000000000, lastUpdated: new Date() },
        { symbol: 'XRP', name: 'Ripple', price: 0.85, change24h: 3.2, volume24h: 1000000000, lastUpdated: new Date() },
    ];

    for (const crypto of cryptos) {
        await CryptoWatchlist.create(crypto);
    }

    console.log('Crypto Watchlist seeded!');
    process.exit(0); // Exit the process after seeding
};

export default seedCryptoWatchlist;