
import { Container, Row, Col } from 'react-bootstrap';
function Job() {
  return (
    <Container className="header-container">
      <h1 className="job-header">Joina vårt team</h1>
      <Row>
        <Col>
          <div className="member-container">
            <img className="member-img" src="https://i.postimg.cc/sfNtTLmN/24a890be-3d5b-49ae-ae70-e9b54d15b7d6.jpg" alt="member 1" />
            <h3 className="name">Emil</h3>
            <p>IT-chef-Globetrotter</p>
         <div className="description">Slav.</div>
          </div>
        </Col>
        <Col>
          <div className="member-container">
           <img className="member-img" src="https://i.postimg.cc/k4XgvHs5/ee56304c-dd4d-495d-ae7b-e51cb2e4b2d7.jpg" alt="member 2" />
            <h3 className="name">Majed</h3>
            <p>Marknadschef-Globetrotter</p>
            <div className="description">Får världen att vilja resa.</div>
          </div>
        </Col>
        <Col>
          <div className="member-container">
           <img className="member-img" src="https://i.postimg.cc/XYdqjdXn/c6093218-8399-496b-8aba-4d82cff2a9ed.jpg" alt="member 3" />
            <h3 className="name">Julia</h3>
            <p>Personalchef-Globetrotter</p>
            <div className="description">Diktator över grupp.</div>
          </div>
        </Col>
        <Col>
          <div className="member-container">
           <img className="member-img" src="https://i.postimg.cc/d3NkCFKv/192415d5-83bf-47de-8383-bcb8e6e7311e.jpg" alt="member 4" />
            <h3 className="name">Vanessa</h3>
            <p>Chefsdesigner-Globetrotter</p>
            <div className="description">Glad att få vara här.</div>
          </div>
        </Col>
        <Col>
          <div className="member-container">
           <img className="member-img" src="https://i.postimg.cc/t4w3fhwy/5183dcea-2ed6-47af-845d-75fe25422774.jpg" alt="member 5" />
            <h3 className="name">Ivan</h3>
            <p>Admin-Globetrotter</p>
            <div className="description">Önskar han vore i Serbien.</div>
          </div>
        </Col>
      </Row>
      <div className="job-reklam">
        <h2>Varför jobba hos oss?</h2>
        <p className="reklam-text">
          På GLOBETROTTER är vi en grupp passionerade individer som älskar att skapa minnesvärda resor för våra kunder.
          Genom att ansluta resenärer med fantastiska destinationer till oslagbara priser, förverkligar vi drömmar varje dag.
          När du jobbar hos oss får du möjlighet att påverka, lära dig och utvecklas, samt uppleva en balans mellan arbete och fritid.
          Vi är en gemenskap där varje medlem är viktig och välkommen att bidra till vår framgång.
          Om du delar vår passion för resor och vill vara en del av ett engagerat team, utforska våra lediga jobb och ansök idag!</p>
      </div>
      <div className="interest">
        <p>Skriv till oss om du är intresserad genom att skicka ditt CV och ditt motivationsbrev till den här adressen:</p>
        <p className="email">travelauction.globetrotter@gmail.com</p>
      </div>
      <hr className="seperator" />
      <div className="job-openings">
        <h2 className="job-openings-title">Lediga jobb</h2>
        <p className="job-openings-text">Just nu är det tomt här. Vi är fullständigt fulländade.</p>
      </div>
  </Container>
  );
}
export default Job
