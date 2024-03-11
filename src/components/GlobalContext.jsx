import { createContext, useState, useContext, useEffect } from "react";

const Globalcontext = createContext()

export const useAuth = () => useContext(Globalcontext);

function GlobalProvider({ children }) {

  const [user, setUser] = useState({})
  const [search, setSearch] = useState('')
  const [loginMessage, setLoginMessage] = useState('');
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      const id = user.id
      async function getFavorites() {
        const response = await fetch(`/api/favorites?user_id=${id}`)
        const data = await response.json()
        return data
      }
      getFavorites().then(userFavorites => {
        setFavorites(userFavorites)
      })
    } else {
      setFavorites([])
    }
  }, [user])

  const login = (userData) => {
    setUser(userData);
    setLoginMessage('Välkommen' + userData.username);
  };
  const logout = () => {
    setFavorites([])
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
    setLoginMessage,
    favorites,
    setFavorites
  }}>
    {children}
  </Globalcontext.Provider>
}

export {GlobalProvider, Globalcontext}