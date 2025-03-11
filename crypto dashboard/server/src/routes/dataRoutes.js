import express from 'express';
import { getCryptoData, getStockData, getCryptoWatchlist, addCryptoToWatchlist,addStockToWatchlist, getStockWatchlist } from '../controllers/dataController.js';

const router = express.Router();

router.get('/crypto', getCryptoData);
router.get('/stock', getStockData);
router.get('/cryptoWatchlist', getCryptoWatchlist);
router.post('/cryptoWatchlist', addCryptoToWatchlist);
router.get('/stockWatchlist', getStockWatchlist);
router.post('/stockWatchlist', addStockToWatchlist);


export default router;