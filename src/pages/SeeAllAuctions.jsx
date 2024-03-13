import { AuktionsLista } from "../components/AuktionsLista";
import ScrollToTopButton from "../components/ScrollToTop";

import { useEffect, useState } from "react";


export default function SeeAll() {

  const [scrollUp, setScrollUp] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight + 9000;
      if (document.body.scrollHeight < scrolledTo) {
        setScrollUp(true)
      } else {
        setScrollUp(false)
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div id="see_all_auctions">
    <div id="blue_background_box">
      <AuktionsLista />
      {scrollUp ? <ScrollToTopButton/> : <></>}
    </div>
  </div>

}