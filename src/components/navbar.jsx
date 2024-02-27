import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from './Nav';
import SearchBar from './Search'

function NavbarOffcanvas() {
  return (
    <>
      {[false].map((expand) =>
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/">Globetrotter</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
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
