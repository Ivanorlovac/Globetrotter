import React from 'react';
import { useAuth } from '../context/AuthContext' 

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button onClick={logout}>Logga ut</button>
  );
};

export default LogoutButton;
