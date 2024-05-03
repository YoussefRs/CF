import React, { useState } from "react";
import "./Calendar.css";
import { Calendar } from "react-multi-date-picker";

export default function CalendarComp({ setBookingData, bookingData }) {
  const [datePickerValue, setDatePickerValue] = useState([]);

  const handleDateChange = (value) => {
    if (value.length === 2) {
      const [startDate, endDate] = value;
      const formattedStartDate = `${startDate.year}-${String(
        startDate.month.index + 1
      ).padStart(2, "0")}-${String(startDate.day).padStart(2, "0")}`;
      const formattedEndDate = `${endDate.year}-${String(
        endDate.month.index + 1
      ).padStart(2, "0")}-${String(endDate.day).padStart(2, "0")}`;
      const start = new Date(formattedStartDate);
      const end = new Date(formattedEndDate);
      
      // Calculating the difference in milliseconds between the start and end dates
      const diffTime = Math.abs(end - start);
      // Converting the difference in milliseconds to days
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      // Set booking data with both start and end dates and the calculated nights count
      setBookingData({
        ...bookingData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        nightsCount: diffDays,
      });
    }
  };
  
  

  return (
    <div className="_calendar_ctr">
      <Calendar
        range
        value={datePickerValue}
        onChange={handleDateChange}
        dateDisplayFormat="dd/MM/yyyy"
        className="mt-3 _details_calendar"
        minDate={new Date()}
      />
    </div>
  );
}
