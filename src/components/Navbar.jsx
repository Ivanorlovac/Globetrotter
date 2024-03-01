import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import Nav from './Nav';
import SearchBar from './Search'

function NavbarOffcanvas() {
  return (
    <>
      {[false].map((expand) =>
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" id='navbar-field'>
          <Container fluid>
            <Navbar.Brand href="/"><Image src="../src/assets/images/logo5.png" rounded id='logo' />Globetrotter</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
              
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Meny
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <SearchBar />
                <Nav />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      )}
    </>
  )
}

export default NavbarOffcanvas;
