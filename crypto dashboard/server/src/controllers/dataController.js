import fetch from 'node-fetch';
import CryptoWatchlist from '../models/CryptoWatchlist.js';

export const getCryptoData = async (req, res) => {
    const { name } = req.query;
    try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${process.env.CMC_API_KEY}`);
        const data = await response.json();
        const filteredData = data.Data.filter(coin =>
            coin.CoinInfo.Name.toLowerCase().includes(name.toLowerCase()) ||
            coin.CoinInfo.FullName.toLowerCase().includes(name.toLowerCase())
        );
        res.json(filteredData || []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching crypto data' });
    }
};

export const getStockData = async (req, res) => {
    const { symbol } = req.query;
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.ALPHAVANTAGE_API_KEY}`);
        const data = await response.json();
        if (data["Time Series (5min)"]) {
            const latestTime = Object.keys(data["Time Series (5min)"])[0];
            const latestData = data["Time Series (5min)"][latestTime];
            res.json({
                time: latestTime,
                open: latestData["1. open"],
                high: latestData["2. high"],
                low: latestData["3. low"],
                close: latestData["4. close"],
                volume: latestData["5. volume"],
            });
        } else {
            res.status(400).json({ message: 'Invalid Symbol or API Limit Reached' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stock data' });
    }
};

export const getCryptoWatchlist = async (req, res) => {
    try {
        const cryptos = await CryptoWatchlist.findAll();
        res.json(cryptos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching crypto watchlist' });
    }
};

export const addCryptoToWatchlist = async (req, res) => {
    const { symbol, name, price, change24h, volume24h, lastUpdated } = req.body;
    try {
        const newCrypto = await CryptoWatchlist.create({ symbol, name, price, change24h, volume24h, lastUpdated });
        res.status(201).json(newCrypto);
    } catch (error) {
        res.status(500).json({ message: 'Error adding crypto to watchlist' });
    }
};