import React, { useState, useEffect } from 'react';


function StockWatchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5001/api/data/stockWatchlist');
        if (!response.ok) {
          const errorDetails = await response.json();
          console.error('Error response from API:', errorDetails);
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        console.log('Fetched watchlist:', result);
        setWatchlist(result || []);
      } catch (error) {
        console.error('Error details:', error);
        setError('Error fetching watchlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div>
      <h2>Stock Watchlist</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Time</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{new Date(stock.time).toLocaleString()}</td>
              <td>${stock.open.toFixed(2)}</td>
              <td>${stock.high.toFixed(2)}</td>
              <td>${stock.low.toFixed(2)}</td>
              <td>${stock.close.toFixed(2)}</td>
              <td>{stock.volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockWatchlist;