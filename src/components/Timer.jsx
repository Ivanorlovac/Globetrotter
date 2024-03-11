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

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Auktion avslutad</span>;
    } else {
      if (days > 0) {
        return <span>{days}D {hours}H {minutes}M {seconds}S</span>;
      } else if (days === 0) {
        if (hours === 0) {
          return <span>{minutes}M {seconds}S</span>;
        }
        return <span>{hours}H {minutes}M {seconds}S</span>;
      }
    }
  };

  return <>
    {time != null ? <div className="timer" style={styleTimer}><Countdown date={Date.parse(new Date(time).toLocaleString('se-SE', { timeZone: 'cet' }))} renderer={renderer}></Countdown></div>
      : <p>00:00:00:00</p>}
  </>

}