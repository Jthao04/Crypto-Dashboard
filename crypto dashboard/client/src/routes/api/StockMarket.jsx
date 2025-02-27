import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StockMarket.css"; // Import the CSS file

function StockMarket() {
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    // Retrieve watchlist from localStorage on initial load
    const savedWatchlist = localStorage.getItem("stockWatchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  useEffect(() => {
    // Save watchlist to localStorage whenever it changes
    localStorage.setItem("stockWatchlist", JSON.stringify(watchlist));
  }, [watchlist]);

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

  const addToWatchlist = () => {
    if (!data || !data.symbol || !data.open) {
      setError("Invalid stock data. Please fetch valid stock data before adding to the watchlist.");
      return;
    }

    const newWatchlistItem = {
      symbol: data.symbol.toUpperCase(),
      openPrice: data.open,
    };

    // Check if the item already exists in the watchlist
    const itemExists = watchlist.some(item => item.symbol === newWatchlistItem.symbol);

    if (!itemExists) {
      setWatchlist([...watchlist, newWatchlistItem]);
      alert(`${data.symbol} added to watchlist`);
    } else {
      alert(`${data.symbol} is already in the watchlist`);
    }

    setSymbol("");
    setData(null);
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
          <button className="btn btn-dark" onClick={fetchStockData}>
            Fetch
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <div>
          <p className="text-large">Time: {data.time}</p>
          <p className="text-large">Open: {data.open}</p>
          <p className="text-large">High: {data.high}</p>
          <p className="text-large">Low: {data.low}</p>
          <p className="text-large">Close: {data.close}</p>
          <p className="text-large">Volume: {data.volume}</p>
          <button className="btn btn-secondary" onClick={addToWatchlist}>
            Add to Watchlist
          </button>
        </div>
      )}
      <h2>Stock Watchlist</h2>
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