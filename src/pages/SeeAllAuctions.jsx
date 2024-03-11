import { AuktionsLista } from "../components/AuktionsLista";
import ScrollToTopButton from "../components/ScrollToTop";




export default function SeeAll() {

  return <div id="see_all_auctions">
    <div id="blue_background_box">
      <AuktionsLista />
      <ScrollToTopButton/>
    </div>
  </div>

}