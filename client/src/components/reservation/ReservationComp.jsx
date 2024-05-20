import React, { useEffect } from 'react';
import "./ReservationComp.css";

function ReservationComp({ Rid }) {
  useEffect(() => {
    const scriptUrl = 'https://login.smoobu.com/js/Settings/BookingToolIframe.js';
    let script = document.querySelector(`script[src="${scriptUrl}"]`);

    const initializeBookingTool = () => {
      const initializeScript = document.createElement('script');
      initializeScript.innerHTML = `BookingToolIframe.initialize({
        "url": "https://login.smoobu.com/en/booking-tool/iframe/753953/${Rid}",
        "baseUrl": "https://login.smoobu.com",
        "target": "#apartmentIframe${Rid}"
      });`;

      document.body.appendChild(initializeScript);

      return () => {
        document.body.removeChild(initializeScript);
      };
    };

    if (!script) {
      script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.onload = initializeBookingTool;
      document.body.appendChild(script);
    } else {
      initializeBookingTool();
    }

    return () => {
      if (script) {
        script.onload = null; // Remove the onload handler to prevent memory leaks
      }
    };
  }, [Rid]);

  return <div id={`apartmentIframe${Rid}`}></div>;
}

export default ReservationComp;
