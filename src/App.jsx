import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuktionsLista from './components/AuktionsLista';
import AuktionsDetaljer from './components/AuktionsDetaljer';
import SkapaAuktion from './components/SkapaAuktion';
import SearchBar from './components/Search.jsx';
import RegisterForm from './components/Register.jsx';
import LoginForm from './components/LoginForm.jsx';
import Nav from './components/Nav.jsx';
import Bidding from './pages/Bidding.jsx';
import { GlobalProvider } from './components/GlobalContext.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    
  };

  return (
    <GlobalProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<AuktionsLista />} />
          <Route path="/skapa-auktion" element={<SkapaAuktion />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/auction/:id/:title" element={<Bidding />} />
        </Routes>
        {user && <div>Välkommen, {user.username}!</div>}
      </Router>
    </GlobalProvider>
  );
};

export default App;
