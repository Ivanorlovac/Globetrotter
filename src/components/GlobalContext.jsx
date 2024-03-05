import { createContext, useState, useContext } from "react";

const Globalcontext = createContext()

export const useAuth = () => useContext(Globalcontext);

function GlobalProvider({ children }) {

  const [user, setUser] = useState(null)
  const [search, setSearch] = useState('')
  const [loginMessage, setLoginMessage] = useState('');

  const login = (userData) => {
    setUser(userData);
    setLoginMessage('Välkomen' + userData.username);
  };
  const logout = () => {
    setUser(null);
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