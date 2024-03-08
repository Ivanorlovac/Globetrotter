import { AuktionsLista_Homepage } from '../components/AuktionsLista';
import SearchBar from '../components/Search';
import ShuffleAuction from '../components/ShuffleAuction.jsx';

export default function Homepage() {
  return <>
  
  <div id='homepage_first_section'>
    <div id='hompage_box'>
      <div>
        <div className='center'>
        <h2>HITTA DIN NÄSTA RESA</h2>
        </div>
      </div>
      <div id='homepage_search'>
        <div id='sec_one'>
            <div>
              <SearchBar/>
          </div>
        </div>
      </div>
      <div id='shuffle_section'>
          <div className='center'>
            <h3>Eller slumpa fram en resa</h3>
          </div>
          <div className='center'>
            <ShuffleAuction/>
          </div>
      </div>

    </div>
  </div>

    <div id='homepage_second_section'>
      <div className='blue_box_centered'>
        <AuktionsLista_Homepage />
      </div>
  </div>



  </>

}