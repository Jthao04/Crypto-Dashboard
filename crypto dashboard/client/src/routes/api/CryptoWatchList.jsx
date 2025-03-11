import React, { useState, useEffect } from 'react';
import './CryptoWatchlist.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CryptoWatchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('${API_BASE_URL}}/api/data/cryptoWatchlist');
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
    <div className="crypto-watchlist-container">
      <h2>Crypto Watchlist</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table className="crypto-watchlist-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((crypto) => (
            <tr key={crypto.symbol}>
              <td>{crypto.symbol}</td>
              <td>{crypto.name}</td>
              <td>${crypto.price.toFixed(2)}</td>
              <td>{crypto.change24h.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoWatchlist;