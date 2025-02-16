import React, { useState, useEffect } from 'react';

const CryptoPrice = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CRYPTO_API_KEY = process.env.CRYPTO_API_KEY || "";

  // This is an example
  // useEffect(() => {
  //   const getCryptoData = async () => {
  //     try {
  //       const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
  //         method: 'GET',
  //         headers: {
  //           'X-CMC_PRO_API_KEY': API_KEY,
  //           'Accept': 'application/json'
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }

  //       const data = await response.json();
  //       const bitcoin = data.data.find(coin => coin.symbol === 'BTC');
  //       setPrice(bitcoin.quote.USD.price.toFixed(2));
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   getCryptoData();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  // return (
  //   <div>
  //     <h1>Bitcoin Price</h1>
  //     <p>Bitcoin Price in USD: ${price}</p>
  //   </div>
  // );
};

export default CryptoPrice;
