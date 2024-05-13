import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [creator, setCreator] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
      name,
      role,
      ...(role === 'seller' && { creator })
    };

    console.log("UserData: ", userData)

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        alert('Registrering misslyckades!');
        throw new Error('Registrering misslyckades');
      } else {
        alert('Registrering lyckades!');
        navigate('/login');
      }

    } catch (error) {
      console.error('Registrering misslyckades', error);
    }
  };

  return <div className="center_the_blue_login_box">
    <div className='blue_box_centered_login'>
      <h2>Registrera ny användare</h2>
      <form id='new_user' onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            id ="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Användarnamn"
            required
          />
          <input
            id ="password"            
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lösenord"
            required
          />
          <input
            id = "name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Namn"
            required
          />
          <select value={role}
            id = "role-dropdown"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">Köpare</option>
            <option value="seller">Säljare</option>
          </select>
        </div>

        {role === 'seller' && (
          <div id='sellers_register'>
            <input type="text" id = "companyName" value={creator} onChange={(e) => setCreator(e.target.value)} placeholder="Företagsnamn" required={role === 'seller'} />
          </div>
        )}

        <button id = "register-button" className='button_smooth' type="submit">Registrera</button>
      </form>
    </div>
  </div>
    ;
};

/* const handleLogin = async (username, password) => {
  try {
    const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
    if (!response.ok) {
      throw new Error('Nätverksfel vid inloggning');
    }
    const users = await response.json();
    if (users.length > 0) {
      console.log('Inloggning lyckades');

    } else {
      console.log('Inloggning misslyckades: användarnamn eller lösenord är felaktigt');
    }
  } catch (error) {
    console.error('Fel vid inloggning', error);
  }
}; */


export default RegisterForm;
