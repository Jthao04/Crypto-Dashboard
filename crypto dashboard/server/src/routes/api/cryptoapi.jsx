import React, { useState, useEffect } from 'react';

const CryptoPrice = () => {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CRYPTO_API_KEY = process.env.CRYPTO_API_KEY || "";

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const response = await  fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
          method: 'GET',
          headers: {
            'X-CMC_PRO_API_KEY': CRYPTO_API_KEY,
            'Accept': 'application/json'
          }
        });
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setCrypto(data.data || []);
          setLoading(false);
          } catch (error) {
          console.error('Error fetching crypto data:', error);
          setError(error.message); 
          setLoading(false);
        }
        };

        getCryptoData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Crypto Market Data</h2>
            <ul>
                {crypto.map((coin) => (
                    <li key={coin.id}>{coin.name}: ${coin.quote.USD.price.toFixed(2)}</li>
                ))}
            </ul>
        </div>
    );
}

export default CryptoPrice;