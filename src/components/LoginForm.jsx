import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/users?username=${username}&password=${password}`);
      if (response.data.length > 0) {
        // Anropa onLoginSuccess med användardata
        onLoginSuccess(response.data[0]);
      } else {
        setError('Felaktigt användarnamn eller lösenord.');
      }
    } catch (error) {
      setError('Ett fel uppstod vid inloggning.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Användarnamn:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Lösenord:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Logga in</button>
    </form>
  );
};

export default LoginForm;
