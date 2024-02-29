import React, { useContext, useEffect, useState } from "react";
import Countdown from 'react-countdown';
import { Globalcontext } from "./GlobalContext.jsx";

export default function Timer(props) {

  const { timeCloseAution, setTimeCloseAution } = useContext(Globalcontext);
  const Completionist = () => setTimeCloseAution(true)

  let time = props.objEndTime

  const styleClosed = {
    color: "grey",
    fontSize: "20px",
    fontWeight: "bold"
  }

  const styleTimer = {
    fontSize: props.fontSize,
    fontWeight: props.setBold ? "bold" : "normal",
    border: props.showBorder ? "2px solid rgb(177, 177, 177)" : "none",
    padding: "7px",
    borderRadius: "20px",
    width: "fit-content",
  }

  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <span>
        {days}D {hours}H {minutes}M {seconds}S
      </span>
    );
  };  

  return <>
    {timeCloseAution ? <p style={styleClosed}>Auktion avslutad</p> : time != null ? <div style={styleTimer}><Countdown date={Date.parse(time)} onComplete={Completionist} renderer={renderer}></Countdown></div>
      : <p>00:00:00:00</p>}
  </>

}

