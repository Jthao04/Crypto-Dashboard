import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
      const response = await fetch(
        `http://localhost:5001/api/data/stock?symbol=${symbol}`
      );
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
    if (!symbol) {
      setError("Please enter a stock symbol");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/data/stock?symbol=${symbol}`
      );
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error response from API:", errorDetails);
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      const openPrice = result.open;
      setWatchlist([...watchlist, { symbol: symbol.toUpperCase(), openPrice }]);
      setSymbol("");
    } catch (error) {
      console.error("Error details:", error);
      setError("Error fetching stock data");
    }
  };

  return (
    <div className="container">
      <h1 style={{ color: 'white' }}>Stock Market</h1> {/* Inline CSS to change header color to white */}
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
          <button className="btn btn-primary" onClick={fetchStockData}>
            Fetch
          </button>
          <button className="btn btn-secondary" onClick={addToWatchlist}>
            Add to Watchlist
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'white' }}>{error}</p>}
      {data && (
        <div>
          <p style={{ color: 'white' }}>Time: {data.time}</p>
          <p style={{ color: 'white' }}>Open: {data.open}</p>
          <p style={{ color: 'white' }}>High: {data.high}</p>
          <p style={{ color: 'white' }}>Low: {data.low}</p>
          <p style={{ color: 'white' }}>Close: {data.close}</p>
          <p style={{ color: 'white' }}>Volume: {data.volume}</p>
        </div>
      )}
      <h2 style={{ color: 'white' }}>Watchlist</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ color: 'white' }}>Symbol</th>
            <th style={{ color: 'white' }}>Open Price</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((stock) => (
            <tr key={stock.symbol}>
              <td style={{ color: 'white' }}>{stock.symbol}</td>
              <td style={{ color: 'white' }}>{stock.openPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockMarket;