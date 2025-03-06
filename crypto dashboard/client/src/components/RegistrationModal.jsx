import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null; // Hide the modal if not open

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) throw new Error("Registration failed");

      alert("✅ Registration successful!");
      onClose(); // Close the modal after registration
      navigate("/login"); // Redirect to login page after registration
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-off-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl mb-4" style={{ color: 'white' }}>Register</h2> {/* Inline CSS to change header color to white */}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-2" style={{ color: 'white' }}> {/* Inline CSS to change label color to white */}
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border p-2 w-full rounded"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2" style={{ color: 'white' }}> {/* Inline CSS to change label color to white */}
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 w-full rounded"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2" style={{ color: 'white' }}> {/* Inline CSS to change label color to white */}
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 w-full rounded"
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Register
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

export default RegisterModal;