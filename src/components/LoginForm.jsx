import React, { useState } from 'react';


const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Använder fetch för att göra en GET-begäran
      const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
      if (!response.ok) {
        throw new Error('Nätverksfel vid inloggning');
      }
      const data = await response.json();
      if (data.length > 0) {
        // Anropa onLoginSuccess med användardata
        onLoginSuccess(data[0]);
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
