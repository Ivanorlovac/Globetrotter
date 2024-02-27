import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Nav from './Nav';

export default function NavbarComp() {
  
  <div>
    <div className="offcanvas offcanvas-start" id="hamburger">
      <div className="offcanvas-header">
        <h1 className="offcanvas-title">Meny</h1>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body">
        {Nav}
      </div>
    </div>
    </div>
  return <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#hamburger">
            Hamburgare
          </button>
          <a className="navbar-brand" href="/">
            <img src="../logo5.png" alt="Avatar Logo" style={{ width: '40px' }} className="rounded-pill" />
          </a>
        </div>
      </nav>
  </>
};
