import React, { useState } from 'react';

function CryptoMarket() {
  const [crypto, setCrypto] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCryptoData = async () => {
    if (!search) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        method: 'GET',
        headers: {
          'X-CMC_PRO_API_KEY': 'a5b25488-ae62-4407-8c05-50af80c00207',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setCrypto(result.data || []);
    } catch (error) {
      setError('Error fetching crypto data');
    } finally {
      setLoading(false);
    }
  };

  const filteredCrypto = crypto.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Crypto Market Data</h1>
      <input
        type="text"
        placeholder="Search Crypto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={fetchCryptoData}>Fetch</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {filteredCrypto.map((coin) => (
        <div key={coin.id}>
          <p>Symbol: {coin.symbol}</p>
          <p>Name: {coin.name}</p>
          <p>Price: ${coin.quote.USD.price.toFixed(2)}</p>
          <p>Change (24h): {coin.quote.USD.percent_change_24h.toFixed(2)}%</p>
          <p>Volume (24h): ${coin.quote.USD.volume_24h.toLocaleString()}</p>
          <p>Last Updated: {new Date(coin.last_updated).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default CryptoMarket;