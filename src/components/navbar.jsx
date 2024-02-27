import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default function NavbarComp(){
  return (
    <div>
      <div className="offcanvas offcanvas-start" id="hamburger">
        <div class="offcanvas-header">
          <h1 className="offcanvas-title">Meny</h1>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <Link to="/" className="mr-4">Hem</Link>
          <Link to="/skapa-auktion" className="mr-4">Skapa Auktion</Link>
          <Link to="/register" className="mr-4">Registrera</Link>
          <Link to="/login">Logga in</Link>
        </div>
      </div>

      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#hamburger">
            Open Offcanvas Sidebar
          </button>
          <a className="navbar-brand" href="#">
            <img src="../logo5.png" alt="Avatar Logo" style={{ width: '40px' }} className="rounded-pill" />
          </a>
        </div>
      </nav>
    </div>
  );
};
