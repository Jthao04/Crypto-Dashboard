import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StockMarket.css"; 



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        `${API_BASE_URL}/api/data/stock?symbol=${symbol}`
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
        `${API_BASE_URL}/api/data/stock?symbol=${symbol}`
      );
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error response from API:", errorDetails);
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      const openPrice = result.open;
      setWatchlist([...watchlist, { symbol: symbol.toUpperCase(), openPrice: openPrice }]);
      setSymbol("");
    } catch (error) {
      console.error("Error details:", error);
      setError("Error fetching stock data");
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
          <button className="btn btn-black" onClick={addToWatchlist}>
            Add to Watchlist
          </button>
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
      <h2>Watchlist</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Open Price</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.openPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockMarket;



