import React, { useState } from "react";
import "./Calendar.css";
import { Calendar } from "react-multi-date-picker";

export default function CalendarComp({ setBookingData, bookingData, card }) {
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

  function formatDailySalesDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding leading zero if needed
    const day = String(date.getDate()).padStart(2, "0"); // Adding leading zero if needed

    return `${month}-${day}-${year}`;
  }

  return (
    <div className="_calendar_ctr">
      <Calendar
        range
        value={datePickerValue}
        onChange={handleDateChange}
        dateDisplayFormat="dd/MM/yyyy"
        className="mt-3 _details_calendar"
        minDate={new Date()}
        mapDays={({ date }) => {
          let props = {};
          card?.prices?.forEach((price) => {
            const startDate = new Date(price.start_date);
            const endDate = new Date(price.end_date);

            if (date >= startDate && date <= endDate) {
              props.className = "special-date";
              props.style = {
                fontWeight: "bold",
                backgroundColor: "#028139",
                color: "white",
              };
            }
          });

          return props;
        }}
      />
    </div>
  );
}
