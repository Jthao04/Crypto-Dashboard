import express from 'express';
import { getCryptoData, getStockData, getCryptoWatchlist, addCryptoToWatchlist,addStockWatchlist, getStockWatchlist } from '../controllers/dataController.js';

const router = express.Router();

router.get('/crypto', getCryptoData);
router.get('/stock', getStockData);
router.get('/cryptoWatchlist', getCryptoWatchlist);
router.post('/cryptoWatchlist', addCryptoToWatchlist);
router.post('/stockWatchlist', addStockWatchlist);
router.get('/stockWatchlist', getStockWatchlist);

export default router;