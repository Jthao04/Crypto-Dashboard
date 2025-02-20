import React, { useState } from 'react';

function CryptoMarket() {
  const [crypto, setCrypto] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCryptoData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${import.meta.env.VITE_CRYPTOCOMPARE_API_KEY}`);

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error response from CryptoCompare API:', errorDetails);
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      console.log('API response:', result);
      setCrypto(result.Data || []);
    } catch (error) {
      console.error('Error details:', error);
      setError('Error fetching crypto data');
    } finally {
      setLoading(false);
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
        </div>
      ))}
    </div>
  );
}

export default CryptoMarket;