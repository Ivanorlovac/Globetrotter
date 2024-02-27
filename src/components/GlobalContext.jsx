import { createContext, useState } from "react";

const Globalcontext = createContext()

function GlobalProvider({ children }) {

  const [user, setUser] = useState({})
  const [search, setSearch] = useState('')

  return <Globalcontext.Provider value={{
    user,
    setUser,
    search,
    setSearch
  }}>
    {children}
  </Globalcontext.Provider>
}

export { GlobalProvider, Globalcontext }