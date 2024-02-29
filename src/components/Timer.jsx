
import React, { useContext, useEffect, useState } from "react";
import Countdown from 'react-countdown';
import { Globalcontext } from "./GlobalContext.jsx";

export default function Timer(props) {

  const { timeCloseAution, setTimeCloseAution } = useContext(Globalcontext);
  const Completionist = () => setTimeCloseAution(true)

  let time = props.objTime

  const styleClosed = {
    color: "grey",
    fontSize: "20px",
    fontWeight: "bold"
  }

  const styleTimer = {
    fontSize: "20px",
    fontWeight: "bold",
    border: "2px solid rgb(177, 177, 177)",
    padding: "7px",
    borderRadius: "20px",
  }

  return <>
    {timeCloseAution ? <p style={styleClosed}>Auktion avslutad</p> : time != null ? <div style={styleTimer}><Countdown date={Date.parse(props.objTime)} onComplete={Completionist}></Countdown></div>
      : <p>00:00:00:00</p>}
  </>

}

