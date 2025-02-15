import React, { useState } from "react";

const StockMarket = () => {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);

    const API_KEY = "09PQOHW6GU7YQVV1";
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result["Time Series (5min)"]) {
        const latestTime = Object.keys(result["Time Series (5min)"])[0];
        const latestData = result["Time Series (5min)"][latestTime];

        setData({
          time: latestTime,
          open: latestData["1. open"],
          high: latestData["2. high"],
          low: latestData["3. low"],
          close: latestData["4. close"],
          volume: latestData["5. volume"],
        });
      } else {
        setError("Invalid Symbol or API Limit Reached");
      }
    } catch (err) {
      setError("Error fetching data");
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={fetchStockData}>Fetch</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <p>Time: {data.time}</p>
          <p>Open: {data.open}</p>
          <p>High: {data.high}</p>
          <p>Low: {data.low}</p>
          <p>Close: {data.close}</p>
          <p>Volume: {data.volume}</p>
        </div>
      )}
    </div>
  )
  export default StockMarket