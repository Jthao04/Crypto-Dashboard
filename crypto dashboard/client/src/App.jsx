import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoMarket from './routes/api/CryptoMarket';
import StockMarket from './routes/api/StockMarket';
import Navbar from './components/Navbar';
import './App.css';

function Home() {
  return <h1>Welcome to the Crypto and Stock Dashboard</h1>;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto-market" element={<CryptoMarket />} />
        <Route path="/stock-market" element={<StockMarket />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;