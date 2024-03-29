import React, { useState , useContext } from 'react';
import { Globalcontext } from './GlobalContext.jsx';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setLoginMessage } = useContext(Globalcontext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
      if (!response.ok) {
        throw new Error('Nätverksfel vid inloggning');
      }
      const data = await response.json();
      if (data.length > 0) {
        setUser(data[0]);
        localStorage.setItem('user', JSON.stringify(data[0]));
        setLoginMessage('Välkommen ' + data[0].username);
        if (data[0].role === 'seller') {
          navigate('/SellersPage');
        } else {
          history.back();
        }
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
      <div id='left_login'>
        <label>Användarnamn:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Lösenord:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <div id='right_login'>
        <button className='button_smooth' type="submit">Logga in</button>
      </div>
    </form>
  );
};

export default LoginForm;
