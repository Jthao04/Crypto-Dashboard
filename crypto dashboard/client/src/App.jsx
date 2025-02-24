import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoMarket from './routes/api/CryptoMarket';
import StockMarket from './routes/api/StockMarket';
import Navbar from './components/Navbar';
import LoginModal from "./components/LoginModal";
import './App.css';

function Home() {
  return <h1>Welcome to the Crypto and Stock Dashboard</h1>;
}

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <Router>
      <Navbar />
      <div className="App p-8">
        <h1 className="text-3xl mb-6">Welcome to Stock & Crypto Watcher</h1>

        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
        >
          Open Login
        </button>

        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crypto-market" element={<CryptoMarket />} />
          <Route path="/stock-market" element={<StockMarket />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;