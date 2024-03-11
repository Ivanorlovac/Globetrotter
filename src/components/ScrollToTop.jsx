import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Visa eller dölj knappen beroende på skrollpositionen
  const handleScroll = () => {
    const yOffset = window.scrollY;

    if (yOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Lägg till en händelselyssnare för att övervaka skrollpositionen
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className={`button_smooth scroll-to-top-button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      <span className="material-symbols-outlined">
        keyboard_double_arrow_up
      </span>
      Upp
    </button>
  );
};

export default ScrollToTopButton;
