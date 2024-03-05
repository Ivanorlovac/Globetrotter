import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuktionsLista from '../components/AuktionsLista';

export default function Homepage() {
  return <div id='homepage_first_section'>
    <div id='hompage_box'>
      <div>
        <div>
        <h2>Sök din resa</h2>
        </div>
      </div>
      <div>
        <div>
          <div>
            <div><p>Fritext</p></div>
          </div>
          <div>
            <div>Sökruta</div>
          </div>
        </div>
        <div>Eller</div>
        <div>
          <div>
            <div>Välj datum</div>
          </div>
          <div>
            <div>Kalender</div>
          </div>
        </div>
      </div>
      <div>
        <div><button>Shuffle</button></div>
      </div>

    </div>
  </div>





}