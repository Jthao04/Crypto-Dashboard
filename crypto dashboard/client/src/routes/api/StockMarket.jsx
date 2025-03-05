import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StockMarket.css"; 
import StockWatchlist from "./StockWatchlist";

function StockMarket() {
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const fetchStockData = async () => {
    if (!symbol) {
      setError("Please enter a stock symbol");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5001/api/data/stock?symbol=${symbol}`);
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error response from API:", errorDetails);
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error details:", error);
      setError("Error fetching stock data");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchStockData();
    }
  };

  const addToWatchlist = async () => {
    try {
      await fetch('http://localhost:5001/api/data/stockWatchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: data.symbol,
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close,
          volume: data.volume,
          lastUpdated: new Date(data.lastUpdated * 1000).toISOString(),
        }),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error response from API:', errorDetails);
        throw new Error('Failed to add stock to watchlist');
      }
  
      alert(`${data.name} added to watchlist`);
      setWatchlist((prev) => !prev);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      alert('Failed to add stock to watchlist');
    }
  };

  return (
    <div className="container">
      <h1>Stock Market</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Stock..."
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="input-group-append">
          <button className="btn btn-black" onClick={fetchStockData}>
            Fetch
          </button>
          <button className="btn btn-dark" onClick={() => addToWatchlist()}>Add to Watchlist</button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
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
      <StockWatchlist watchlist={watchlist} />
    </div>
  );
}

export default StockMarket;