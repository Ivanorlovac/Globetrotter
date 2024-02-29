import React, { useContext, useEffect, useState } from "react";
import Countdown from 'react-countdown';
import { Globalcontext } from "./GlobalContext.jsx";

export default function Timer(props) {

  const { setTimeCloseAution } = useContext(Globalcontext);
  const Completionist = () => setTimeCloseAution(true)

  return (
    <Countdown date={Date.parse(props.objTime)} onComplete={Completionist}>
    </Countdown>
  );

}