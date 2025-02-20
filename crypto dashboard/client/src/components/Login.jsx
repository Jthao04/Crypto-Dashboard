// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//       });

//       if (!response.ok) {
//         const errorDetails = await response.json();
//         console.error('Error response from API:', errorDetails);
//         throw new Error('Failed to login');
//       }

//       const result = await response.json();
//       console.log('Login response:', result);
//       // Assuming the response contains a token or some indication of successful login
//       localStorage.setItem('token', 'mock-token');

//       // Redirect based on a condition (e.g., user preference or role)
//       const userPreference = 'crypto'; // Replace this with actual logic to determine user preference
//       if (userPreference === 'crypto') {
//         navigate('/crypto-market');
//       } else if (userPreference === 'stock') {
//         navigate('/stock-market');
//       } else {
//         navigate('/crypto-market'); // Default redirection
//       }
//     } catch (error) {
//       console.error('Error details:', error);
//       setError('Error logging in');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>Login</button>
//       </form>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default Login;