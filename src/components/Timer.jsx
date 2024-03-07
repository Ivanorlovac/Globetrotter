import React, { useContext, useEffect, useState } from "react";
import Countdown from 'react-countdown';

export default function Timer(props) {

  const [timeCloseAution, setTimeCloseAution ] = useState(false);
  const Completionist = () => setTimeCloseAution(true)

  let time = props.objEndTime

  const styleClosed = {
    color: "black",
    fontSize: props.fontSize,
    fontWeight: props.setBold ? "bold" : "normal",
  }

  const styleTimer = {
    fontSize: props.fontSize,
    fontWeight: props.setBold ? "bold" : "normal",
    border: props.showBorder ? "1px solid rgb(177, 177, 177)" : "none",
    padding: "7px",
    borderRadius: "20px",
    width: "fit-content",
    backgroundColor: "white"
  }

  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <span>
        {days}D {hours}H {minutes}M {seconds}S
      </span>
    );
  };

  return <>
    {timeCloseAution ? <p style={styleClosed}>Auktion avslutad</p> : time != null ? <div style={styleTimer}><Countdown date={Date.parse(new Date(time).toLocaleString('se-SE', { timeZone: 'cet' }))} onComplete={Completionist} renderer={renderer}></Countdown></div>
      : <p>00:00:00:00</p>}
  </>

}