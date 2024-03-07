import { createContext, useState, useContext } from "react";

const Globalcontext = createContext()

export const useAuth = () => useContext(Globalcontext);

function GlobalProvider({ children }) {

  const [user, setUser] = useState({
    "id": "2",
    "username": "user",
    "password": "user",
    "role": "user"
  })
  const [search, setSearch] = useState('')
  const [loginMessage, setLoginMessage] = useState('');

  const login = (userData) => {
    setUser(userData);
    setLoginMessage('Välkommen' + userData.username);
  };
  const logout = () => {
    setUser({});
    setLoginMessage('');
  };

  return <Globalcontext.Provider value={{
    user,
    login,
    logout,
    setUser,
    search,
    setSearch,
    loginMessage,
    setLoginMessage
  }}>
    {children}
  </Globalcontext.Provider>
}

export {GlobalProvider, Globalcontext}