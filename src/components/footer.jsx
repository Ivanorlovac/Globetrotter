import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
  return <footer>
    <Container>
      <Row>
        <Col>
          <p>Kontakt</p>
          <p>FAQ</p>
        </Col>
        <Col>
          <p>Jobba hos oss</p>
          <p>Om oss</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>&#169; Copyright</p>
        </Col>
      </Row>
    </Container>
  </footer>
}