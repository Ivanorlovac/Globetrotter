import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export default function Carousel(props) {

  const [slide, setSlide] = useState(0);

  let images = props.objImages

  const nextSlide = () => {
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  }

  const prevtSlide = () => {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  }



  return <>
    {images != null ?
      <div className="image-container" style={{width:"100%", height:"100%"}}>
        <div className="carousel">
          {props.objImages.map((image, idx) => {
            return (
              <img className={slide === idx ? "slide" : "slide-hidden"} src={image} key={idx} alt={'https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952h9gko1rwe3vohc2q8oucwami901vcwetrds7e5ti&ep=v1_gifs_search&rid=200w.gif&ct=g'} />
            )
          })}
          <span className="indicators">
            {images.map((_, idx) => {
              return <button key={idx} onClick={() => setSlide(idx)} className={slide === idx ? "indicator" : "indicator indicator-inactive"}></button>
            })}
          </span>
        </div>
        <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevtSlide} />
        <BsArrowRightCircleFill className="arrow arrow-right" onClick={nextSlide} />
      </div >
      : <div className="image-container" style={{ width: "100%", height: "100%" }}><p>No images found</p></div>
    }

  </>
}

