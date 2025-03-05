import React, { useState, useEffect } from 'react';

function StockWatchList() {
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
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td>{stock.change24h.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockWatchList;