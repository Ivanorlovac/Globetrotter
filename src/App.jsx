import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SkapaAuktion from './components/SkapaAuktion';
import SearchBar from './components/Search.jsx';
import RegisterForm from './components/Register.jsx';
import NavbarOffcanvas from './components/Navbar.jsx';
import Homepage from './pages/homepage.jsx';
import { GlobalProvider } from './components/GlobalContext.jsx';
import Footer from './components/footer.jsx';
import Contact from './pages/contact.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Bidding from './pages/Bidding.jsx'
import SellersPage from './pages/SellersPage.jsx';
import NotFound from './pages/Fallback.jsx';
import SeeAll from './pages/SeeAllAuctions.jsx';
import { AuktionsLista } from './components/AuktionsLista.jsx';
import MyPage from './pages/MyPage.jsx';
import SellerProfile from './pages/SellersPageInfo.jsx';
import Faq from './pages/Faq.jsx';
import Job from './pages/Job.jsx';
import AboutUs from './pages/Aboutus.jsx';


const App = () => {
  const [user] = useState(null);

  return <>

    <GlobalProvider>
      <Router>
        <main id="main-pic">
          <div id="main-background">
            <NavbarOffcanvas />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/auction/:id/:slug" element={<Bidding />} />
              <Route path="/skapa-auktion" element={<SkapaAuktion />} />
              <Route path="/search" element={<SearchBar />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/SellersPage" element={<SellersPage />} />
              <Route path="/alla-auktioner" element={<SeeAll />} />
              <Route path="/alla-auktioner/:search" element={<SeeAll />} />
              <Route path="/mina-sidor" element={<MyPage />} />
              <Route path='*' element={<NotFound />} />
              <Route path="/seller-profile" element={<SellerProfile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/job" element={<Job />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
            {user && <div>Välkommen, {user.username}!</div>}
          </div>
        </main>
        <Footer />
      </Router>
    </GlobalProvider>
  </>

};

export default App;