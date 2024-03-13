
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function AboutUs() {
  return (
     <>
      <Container>
        <Row>
          <Col>
            <h1 className="top-header">Om Oss</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="about-header">Welcome to Globetrotter, the Ultimate Destination for Travel Enthusiasts!</h1>
             <div>
              <p className="about-text-top"> 
              At Globetrotter, we believe that adventure should not be a luxury, but a fundamental aspect of everyone's life. We are a pioneering travel bidding platform dedicated to bringing your dream vacations within reach.
              </p>
            </div>
         </Col>
       </Row>
       <Row>
         <Col>
           <h2 className="about-title">What we do</h2>
           <p className="about-text">Founded by a group of passionate travelers, our mission is to make exciting travel experiences more accessible and affordable. We offer a unique platform where users can bid on travel packages and deals from all around the globe.
            From tropical beach holidays to wellness experiences, our extensive range of offerings ensures that there is something for everyone.
            We partner with trusted travel providers to secure the best deals for you, the adventure seeker.</p>
        </Col>
      </Row>
           <div className="background-section">
      <Row>
           <h2 className="about-title">How it works</h2>
      </Row>
      <Row>
        <Col>
            <ul className="aboutus-list">
              <li>1. Browse through our wide selection of travel packages and choose the one that sparks your wanderlust.</li>
              <li>2. Place your bid on a dream holiday. With clear starting prices and no hidden fees, bidding is straightforward and transparent.</li>
              <li>3. Outbid the competition and win your way to an unforgettable journey. Prepare to pack your bags and embark on an adventure of a lifetime.</li>
            </ul>
        </Col>
      </Row>
    </div>
  </Container>
 </>
);
}
export default AboutUs
