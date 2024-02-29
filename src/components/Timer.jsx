
import React, { useContext, useEffect, useState } from "react";
import Countdown from 'react-countdown';
import { Globalcontext } from "./GlobalContext.jsx";

export default function Timer(props) {

  const { timeCloseAution, setTimeCloseAution } = useContext(Globalcontext);
  const Completionist = () => setTimeCloseAution(true)

  let time = props.objTime

  return <>
    {timeCloseAution ? <p>Stängd</p> : time != null ? <Countdown date={Date.parse(props.objTime)} onComplete={Completionist}></Countdown>
      : <p>00:00:00:00</p>}
  </>

}




