import {Container, Row, Col, Button} from 'react-bootstrap';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

function Contact() {
  return (
    <Container>
      <Row>
        <Col className="form-container">
          <h1 className="header">LET'S CHAT</h1>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">Förnamn</label>
              <input className="custom-input" type="text" id="firstName"/>
            </div>

            <div className="form-group">
              <label htmlFor="email">E-post</label>
              <input className="custom-input" type="email"  id="email"/>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefonnummer</label>
               <input className="custom-input" type="tel" id="phone"/>
            </div>

            <div className="form-group">
              <label htmlFor="message">Meddelande</label>
              <textarea className="custom-input" id="message" rows={10}></textarea>
            </div>
              
            <Button className="button" variant="primary" type="submit">Skicka</Button>
          </form>    
        </Col>

        <Col className="contact-container">
          <div className="contact-info">
            <h2 className="title">Kontaktinformation</h2>
            <p><MdEmail/>E-post: travelauction.globetrotter@gmail.com</p>
            <p><MdLocationOn/>Address: Propellergatan 1, 211 15 Malmö</p>
            <p><MdPhone/>Telefon: 076 057 788 2</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;