import React, { useState } from 'react';
import CryptoWatchlist from './CryptoWatchList';

function CryptoMarket() {
  const [crypto, setCrypto] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [watchlistUpdated, setWatchlistUpdated] = useState(false); 

  const fetchCryptoData = async () => {
    if (!search) {
      setError('Please enter a cryptocurrency name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5001/api/data/crypto?name=${search}`);
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error response from API:', errorDetails);
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setCrypto(result || []);
    } catch (error) {
      console.error('Error details:', error);
      setError('Error fetching crypto data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchCryptoData();
    }
  };

  const addToWatchlist = async (coin) => {
    try {
      await fetch('http://localhost:5001/api/data/cryptoWatchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: coin.CoinInfo.Name,
          name: coin.CoinInfo.FullName,
          price: coin.RAW.USD.PRICE,
          change24h: coin.RAW.USD.CHANGEPCT24HOUR,
          volume24h: coin.RAW.USD.VOLUME24HOUR,
          lastUpdated: new Date(coin.RAW.USD.LASTUPDATE * 1000),
        }),
      });
      alert(`${coin.CoinInfo.FullName} added to watchlist`);
      setWatchlistUpdated(!watchlistUpdated); // Toggle state to trigger re-render
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      alert('Failed to add to watchlist');
    }
  };

  const filteredCrypto = crypto.filter(coin =>
    coin.CoinInfo.Name.toLowerCase().includes(search.toLowerCase()) ||
    coin.CoinInfo.FullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Crypto Market</h1>
      <input
        type="text"
        placeholder="Search Crypto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={fetchCryptoData}>Fetch</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {filteredCrypto.map((coin) => (
        <div key={coin.CoinInfo.Id}>
          <p>Symbol: {coin.CoinInfo.Name}</p>
          <p>Name: {coin.CoinInfo.FullName}</p>
          <p>Price: ${coin.RAW.USD.PRICE.toFixed(2)}</p>
          <p>Change (24h): {coin.RAW.USD.CHANGEPCT24HOUR.toFixed(2)}%</p>
          <p>Volume (24h): ${coin.RAW.USD.VOLUME24HOUR.toLocaleString()}</p>
          <p>Last Updated: {new Date(coin.RAW.USD.LASTUPDATE * 1000).toLocaleString()}</p>
          <button onClick={() => addToWatchlist(coin)}>Add to Watchlist</button>
        </div>
      ))}
      <CryptoWatchlist key={watchlistUpdated} /> {/* Re-render when watchlistUpdated changes */}
    </div>
  );
}

export default CryptoMarket;