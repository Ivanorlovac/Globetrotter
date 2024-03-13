import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer>
    <Container>
      <Row>
        <Col>
          <p><Link to ="/contact">Kontakt</Link></p>

        </Col>
      </Row>
      <Row>
        <Col>
          <p>&#169; Copyright</p>
          <p><Link to="/aboutUs">Om oss </Link></p>
          <p><Link to ="/faq">FAQ </Link></p>

        </Col>
      </Row>



    </Container>
    
  </footer>
}