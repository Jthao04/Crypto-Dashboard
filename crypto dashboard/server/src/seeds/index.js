import sequelize from '../config/connection.js';
import seedUsers from './userSeed.js';
import seedCryptoWatchlist from './cryptoWatchlistSeed.js';
import seedStockWatchlist from './stockWatchlistSeed.js';

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Database synced!');

    await seedUsers();
    await seedCryptoWatchlist();
    await seedStockWatchlist();

    console.log('All seeds planted!');
    process.exit(0);
};

seedAll();