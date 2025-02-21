import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

const CryptoWatchlist = sequelize.define('CryptoWatchlist', {
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    change24h: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    volume24h: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    lastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default CryptoWatchlist;