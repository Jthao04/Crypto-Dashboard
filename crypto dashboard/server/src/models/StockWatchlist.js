import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

const StockWatchlist = sequelize.define('StockWatchlist', {
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  open: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  high: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  low: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  close: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  volume: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default StockWatchlist;