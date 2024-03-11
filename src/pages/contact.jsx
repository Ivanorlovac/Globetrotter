import { Container, Row, Col, Button} from 'react-bootstrap';


function Contact() {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="header">Kontakta oss</h1>
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

        <Col>
          <div className="contact-info">
            <h2 className="title">Kontaktinformation</h2>
            <p>E-post: travelauction.globetrotter@gmail.com</p>
            <p>Address: Propellergatan 1, 211 15 Malmö</p>
            <p>Telefon: 076 057 788 2</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;