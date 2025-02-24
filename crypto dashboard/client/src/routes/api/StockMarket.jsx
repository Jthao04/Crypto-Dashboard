import React, { useState } from 'react';

function StockMarket() {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [watchlist, setWatchlist] = useState([]); // Define and initialize the watchlist state variable

  const fetchStockData = async () => {
    if (!symbol) {
      setError('Please enter a stock symbol');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5001/api/data/stock?symbol=${symbol}`);
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error response from API:', errorDetails);
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error details:', error);
      setError('Error fetching stock data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchStockData();
    }
  };

  const addToWatchlist = () => {
    setWatchlist([...watchlist, symbol]);
    setSymbol('');
  };

  return (
    <div>
      <h1>Stock Market</h1>
      <input
        type="text"
        placeholder="Search Stock..."
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={fetchStockData}>Fetch</button>
      <button onClick={addToWatchlist}>Add to Watchlist</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <p>Time: {data.time}</p>
          <p>Open: {data.open}</p>
          <p>High: {data.high}</p>
          <p>Low: {data.low}</p>
          <p>Close: {data.close}</p>
          <p>Volume: {data.volume}</p>
        </div>
      )}
      <h2>Watchlist</h2>
      <ul>
        {watchlist.map((stockSymbol) => (
          <li key={stockSymbol}>{stockSymbol}</li>
        ))}
      </ul>
    </div>
  );
}

export default StockMarket;