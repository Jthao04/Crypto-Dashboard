import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const { token } = await response.json();
      localStorage.setItem("token", token);

      alert("✅ Login successful!");
      onClose();
      onLoginSuccess();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-off-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl mb-4" style={{ color: 'white' }}>Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2" style={{ color: 'white' }}>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border p-2 w-full rounded bg-black text-white"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2" style={{ color: 'white' }}>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 w-full rounded bg-black text-white"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 w-full"
          >
            Log In
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;