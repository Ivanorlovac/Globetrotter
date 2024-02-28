import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuktionsLista from './components/AuktionsLista';
import AuktionsDetaljer from './components/AuktionsDetaljer';
import SkapaAuktion from './components/SkapaAuktion';
import SearchBar from './components/Search.jsx';
import RegisterForm from './components/Register.jsx';
import LoginForm from './components/LoginForm.jsx';
import Nav from './components/Nav.jsx';
import { GlobalProvider } from './components/GlobalContext.jsx';
import Footer from './components/footer.jsx';
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
          <Route path="/auktion/:id" element={<AuktionsDetaljer />} />
          <Route path="/skapa-auktion" element={<SkapaAuktion />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
        {user && <div>Välkommen, {user.username}!</div>}
      </Router>
      <Footer/>
    </GlobalProvider>
  );
};

export default App;
