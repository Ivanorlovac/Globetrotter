import React, { useState } from 'react';


const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role: 'user' // Standardroll för nya användare
        }),
      });
      if (!response.ok) {
        throw new Error('Registrering misslyckades');
      }
      const data = await response.json();
      console.log('Registrering lyckades', data);
      // Hantera efter registrering, t.ex. omdirigering eller visa meddelande
    } catch (error) {
      console.error('Registrering misslyckades', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Användarnamn"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Lösenord"
        required
      />
      <button type="submit">Registrera</button>
    </form>
  );
};

const handleLogin = async (username, password) => {
  try {
    const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
    if (!response.ok) {
      throw new Error('Nätverksfel vid inloggning');
    }
    const users = await response.json();
    if (users.length > 0) {
      console.log('Inloggning lyckades', users[0]);
      // Hantera inloggad användare, spara användarinfo i tillstånd eller localStorage för sessionhantering
    } else {
      console.log('Inloggning misslyckades: användarnamn eller lösenord är felaktigt');
    }
  } catch (error) {
    console.error('Fel vid inloggning', error);
  }
};


export default RegisterForm; handleLogin;
