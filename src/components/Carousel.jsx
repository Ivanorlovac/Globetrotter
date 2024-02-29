import React from "react";



export default function Carousel(props) {
  
  console.log("Images: ", props.objImages)


  
  return (
    <div className="carousel">
      {props.objImages.map((image, idx) => {
        return (
          <img className="slide" src={image} key={idx} alt={'https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952h9gko1rwe3vohc2q8oucwami901vcwetrds7e5ti&ep=v1_gifs_search&rid=200w.gif&ct=g'} />
        )
      })}
    </div>
  )
}