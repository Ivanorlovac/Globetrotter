import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Faq() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const handleQuestion = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };
  const faqData = [
    {
      question: "Hur lägger jag ett bud?",
      answer: "För att lägga ett bud, navigera till den auktion som du är intresserad av och ange ditt budbelopp i det angivna fältet."
    },
    {
      question: "Kan jag avbryta ett bud?",
      answer: "Nej, när ett bud har lagts kan det inte avbrytas. Se till att du är säker på ditt bud innan du lägger det."
    },
    {
      question: "Vilka typer av reseupplevelser finns tillgängliga för auktion?",
      answer: "Vi erbjuder ett brett utbud av reseupplevelser, inklusive all-inclusive vistelser, spa-semestrar, äventyrsresor och stadsresor."
    },
    {
      question: "Kan jag se auktionshistorik eller tidigare vinnande bud?",
      answer: "Ja, du kan se auktionshistorik och tidigare vinnande bud. Denna information finns tillgänglig på 'Mina sidor'."
    },
    {
      question: "Hur vet jag om jag har vunnit en auktion?",
      answer: "Om du har vunnit en auktion får du en avisering via e-post eller genom ditt konto på vår plattform."
    },
    {
      question: "Vilka betalningsmetoder accepteras?",
      answer: "Vi accepterar endast kredit-/betalkort."
    },
    {
      question: "Tillkommer det några ytterligare avgifter eller skatter utöver det vinnande budet?",
      answer: "Förutom det vinnande budbeloppet tillkommer inga ytterligare avgifter såsom skatter, serviceavgifter eller resortavgifter."
    },
  ];



  return (
    <Container fluid className="faqContainer">
      <Row className ="faqRow">
        <Col>
           <h3 className="titleExtra">FAQs</h3>
        </Col>
      </Row>
      <Row className="faqRow">
        <Col>
          <img className="faqImage" src="https://andrewharper.com/wp-content/uploads/2024/02/landing-page-auctions-cosme-greece-pool-1.jpg" alt="faq image" />
        </Col>
      </Row>
      <Row className="faqRow">
        <Col>
             <div className="faqBackground">
                <h1 className="mainHeader">Ta reda på svaren på våra mest frekvent ställda frågor!</h1>
                <ul>
                  {faqData.map((item, index) => (
                    <li key={index}>
                      <h3 className="faqQuestion" onClick={() => handleQuestion(index)}>{item.question}</h3>
                      {selectedQuestion === index && <p className="faqAnswer"> {item.answer}</p>}
                    </li>
                  ))}
            </ul>
           </div>
          </Col>
        </Row>
      </Container>
  );
};
  
export default Faq;
