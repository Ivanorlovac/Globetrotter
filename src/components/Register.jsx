import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users', {
        username,
        password,
        role: 'user' // Standardroll för nya användare
      });
      console.log('Registrering lyckades', response.data);
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
    const response = await axios.get(`http://localhost:3001/users?username=${username}&password=${password}`);
    if (response.data.length > 0) {
      console.log('Inloggning lyckades', response.data[0]);
      // Hantera inloggad användare, spara användarinfo i tillstånd eller localStorage för sessionhantering
    } else {
      console.log('Inloggning misslyckades: användarnamn eller lösenord är felaktigt');
    }
  } catch (error) {
    console.error('Fel vid inloggning', error);
  }
};


export default RegisterForm; handleLogin;
