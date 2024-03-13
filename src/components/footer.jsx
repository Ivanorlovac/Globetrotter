import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer>
    <div id='footer_first_section'>
      <div id='footer_left'>
        <ul>
          <li className="footlink"><Link id='link_contact' to="/contact">Kontakt</Link></li>
          <li className="footlink"><Link id='link_faq' to="/faq">FAQ </Link></li>
        </ul>
      </div>

      <div id='footer_right'>
        <ul>
          <li className="footlink"><Link id='link_job' to="/job">Jobba hos oss </Link></li>
          <li className="footlink"><Link id='link_about' to="/aboutus">Om oss </Link></li>
        </ul>
      </div>
    </div>

    <div id='footer_last_section'>
      <p>&#169; Copyright 2024</p>
    </div>
  </footer>
}