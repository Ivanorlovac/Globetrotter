import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function AboutUs() {
  return (
    <> 
      <style> 
        {`
        .about-header {
          font-family: 'Courier New', Courier, monospace;
          font-weight: 600;
          color: #85a2c1;
          margin-top: 50px;
          margin-bottom: 50px;
        }
        .about-title {
          font-family: 'Courier New', Courier, monospace;
          font-weight: 600;
          margin-top: 30px;
          margin-bottom: 30px;
        }
        .about-text {
          font-family: 'Courier New', Courier, monospace;
          font-weight: 600;
          text-align: justify;
          margin-top: 30px;
          margin-bottom: 30px;
        }
        .about-subtitle {
          font-family: 'Courier New', Courier, monospace;
          font-weight: 500;
        }
        `}
      </style>
   
      <Container>
      <Row>
        <Col>
          <h1 className="about-header">Welcome to Globetrotter, the Ultimate Destination for Travel Enthusiasts!</h1>
          <p className="about-text">At Globetrotter, we believe that adventure should not be a luxury, but a fundamental aspect of everyone's life. We are a pioneering travel bidding platform dedicated to bringing your dream vacations within reach. </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="about-title">Our Mission</h2>
          <p className="about-text">Founded by a group of passionate travelers, our mission is to make exciting travel experiences more accessible and affordable.</p>
        </Col>
      <Row>
        <Col>
          <h2 className="about-title">What we do</h2>
          <p className="about-text">We offer a unique platform where users can bid on travel packages and deals from all around the globe.
            From tropical beach holidays to wellness experiences, our extensive range of offerings ensures that there is something for everyone.
            We partner with trusted travel providers to secure the best deals for you, the adventure seeker.</p>
        </Col>
      </Row>
        <h2 className="about-title">How it works</h2>
        <Col>
          <h3 className="about-subtitle">1. Explore</h3>
          <p className="about-text">Browse through our wide selection of travel packages and choose the one that sparks your wanderlust.</p>
        </Col>
        <Col>
          <h3 className="about-subtitle">2. Bid</h3>
          <p className="about-text">Place your bid on a dream holiday. With clear starting prices and no hidden fees, bidding is straightforward and transparent.</p>
        </Col>
        <Col>
          <h3 className="about-subtitle">3. Win</h3>
          <p className="about-text">Outbid the competition and win your way to an unforgettable journey. Prepare to pack your bags and embark on an adventure of a lifetime.</p>
        </Col>
          
       
      </Row>
      </Container>
      </>
  );
  
}

export default AboutUs