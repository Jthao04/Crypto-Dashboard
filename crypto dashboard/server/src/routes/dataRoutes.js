import express from 'express';
import { getCryptoData, getStockData } from '../controllers/dataController.js';

const router = express.Router();

router.get('/crypto', getCryptoData);
router.get('/stock', getStockData);

export default router;