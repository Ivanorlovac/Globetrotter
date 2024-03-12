import { createContext, useState, useContext, useEffect } from "react";

const Globalcontext = createContext()

export const useAuth = () => useContext(Globalcontext);

function GlobalProvider({ children }) {

  const [user, setUser] = useState({
   
  })
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

  const updateUser = async (updatedUser) => {
    setUser(updatedUser); 

    try {
      const response = await fetch(`http://localhost:3000/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error('Failed to update user profile');

      
      const refreshedUser = await response.json();
      setUser(refreshedUser);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };


  return <Globalcontext.Provider value={{
    user,
    updateUser,
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