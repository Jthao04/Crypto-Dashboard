import React, { useState, useEffect } from 'react';

const CryptoPrice = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const getCryptoData = async () => {
//       try {
//         const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setPrice(data.bitcoin.usd);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

    getCryptoData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

//   return (
//     <div>
//       <h1>Bitcoin Price</h1>
//       <p>{price ? `Bitcoin Price in USD: $${price}` : 'Price not available'}</p>
//     </div>
//   );
};

export default CryptoPrice;
