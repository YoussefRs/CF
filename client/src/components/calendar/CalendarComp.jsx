import React, { useEffect } from 'react'

function CalendarComp({ id, loadCalendarUrl, verification }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://login.smoobu.com/js/Apartment/CalendarWidget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id={id} className="calendarWidget" >
      <div
        className="calendarContent"
        data-load-calendar-url={loadCalendarUrl}
        data-verification={verification}
        data-baseUrl="https://login.smoobu.com"
        data-disable-css="false"
      ></div>
    </div>
  );
}

export default CalendarComp