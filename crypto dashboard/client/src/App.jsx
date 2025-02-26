import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoMarket from './routes/api/CryptoMarket';
import StockMarket from './routes/api/StockMarket';
import Navbar from './components/Navbar';
import LoginModal from "./components/LoginModal";
import RegisterModal from './components/RegistrationModal';
import './App.css';

function Home() {
  return <h1>Welcome to MoneyMap</h1>;
}

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginOpen(false);
  };
    
  }
  return (
    <Router>
      <Navbar
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />
      <div className="App p-8">
        {!isAuthenticated && <h1 className="text-3xl mb-6">Welcome to Stock & Crypto Watcher</h1>}

      {!isAuthenticated && (
      <div>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-green-500 text-black py-2 px-6 rounded hover:bg-green-600"
        >
          Open Login
        </button>

        <button
          onClick={() => setIsRegisterOpen(true)}
          className="btn btn-primary text-black py-2 px-6 rounded hover:bg-blue-600 ml-4"
        >
          Open Register
        </button>
       </div>
      )} 
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
        <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />

        {isAuthenticated && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crypto-market" element={<CryptoMarket />} />
            <Route path="/stock-market" element={<StockMarket />} />
            <Route path="*" element={<Home />} />
          </Routes>
        )}
      </div>
    </Router>
  );


export default App;