import { createContext, useState } from "react";

const Globalcontext = createContext()

function GlobalProvider({ children }) {
  
  const [user, setUser] = useState({})
  const [search, setSearch] = useState('')
  const [timeCloseAution, setTimeCloseAution] = useState(false)

  return <Globalcontext.Provider value={{
    user,
    setUser,
    search,
    setSearch,
    timeCloseAution,
    setTimeCloseAution
  }}>
    {children}
  </Globalcontext.Provider>
}

export {GlobalProvider, Globalcontext}