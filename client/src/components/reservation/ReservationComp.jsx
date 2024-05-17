import React, { useEffect } from 'react'
import "./ReservationComp.css"

function ReservationComp({id}) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://login.smoobu.com/js/Settings/BookingToolIframe.js';
        script.async = true;
    
        document.body.appendChild(script);
    
        const initializeScript = document.createElement('script');
        initializeScript.innerHTML = `BookingToolIframe.initialize({
          "url": "https://login.smoobu.com/en/booking-tool/iframe/753953/${id}",
          "baseUrl": "https://login.smoobu.com",
          "target": "#apartmentIframe${id}"
        });`;
    
        document.body.appendChild(initializeScript);
    
        return () => {
          document.body.removeChild(script);
          document.body.removeChild(initializeScript);
        };
      }, [id]);
    
      return <div id={`apartmentIframe${id}`}></div>;
    };

export default ReservationComp