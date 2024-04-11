import { useState } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

function Contact() {

  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [message, setMessage] = useState('')

  const resetForm = () => {
    setSurname('');
    setEmail('');
    setTel('');
    setMessage('');
  };


  const createContact = async (e) => {
    e.preventDefault();

    if (!surname || !email || !tel || !message) {
      alert('Fyll i alla fält!');
      return;
    }

    try {
      const response = await fetch('/api/contact', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surname,
          email,
          tel,
          message
        }),
      });
      
      if (!response.ok) {
        throw new Error('Något gick fel. Försök igen.');
      } 
      alert('Tack för ditt meddelande!');
      resetForm();
    } catch (error) {
      console.error('Något gick fel. Försök igen.')
     }
    };


    
    return (
    <Container>
      <Row>
        <Col className="form-container">
          <h1 className="header">LET'S CHAT</h1>
          <form onSubmit={createContact}>
            <div className="form-group">
              <label htmlFor="firstName">Förnamn</label>
              <input className="custom-input" type="text" id="firstName" value={surname} onChange={(e)=>setSurname(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-post</label>
              <input className="custom-input" type="email"  id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefonnummer</label>
               <input className="custom-input" type="tel" id="phone" value={tel} onChange={(e)=>setTel(e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="message">Meddelande</label>
              <textarea className="custom-input" id="message" rows={10} value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
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