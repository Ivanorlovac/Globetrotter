import { createContext, useState } from "react";

const Globalcontext = createContext()

function GlobalProvider({ children }) {
  
  const [user, setUser] = useState({
    "id": "6",
    "username": "user",
    "password": "user",
    "role": "user"
  })
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState([])

  return <Globalcontext.Provider value={{
    user,
    setUser,
    search,
    setSearch,
    favorites,
    setFavorites
  }}>
    {children}
  </Globalcontext.Provider>
}

export {GlobalProvider, Globalcontext}