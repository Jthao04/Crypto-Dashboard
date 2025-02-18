import { React } from 'react'
import './App.css'
import StockMarket from './routes/api/StockMarket'
import CryptoMarket from './routes/api/CryptoMarket'

function App() {

  return(
    <>
      <div className="App">
        <StockMarket />
        <CryptoMarket />
      </div>
    </>
  );
};

export default App
