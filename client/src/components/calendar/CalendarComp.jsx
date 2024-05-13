import React, { useEffect, useState } from "react";
import "./Calendar.css";
import { Calendar } from "react-multi-date-picker";
import axios from "axios";

export default function CalendarComp({ setBookingData, bookingData, card }) {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [datePickerValue, setDatePickerValue] = useState([]);

  const [approvedBookings, setApprovedBookings] = useState([]);

  useEffect(() => {
    const fetchApprovedBookings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/reservations/unpaid`);
        setApprovedBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApprovedBookings();
  }, []);

  const isDateDisabled = (date) => {
    for (const booking of approvedBookings) {
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);

      // Disable dates within the range of approved bookings
      if (date >= startDate && date <= endDate) {
        return true;
      }
    }
    return false;
  };
  const handleDateChange = (value) => {
    if (value.length === 2) {
      const [startDate, endDate] = value;

      const currentDate = new Date(startDate);
      const lastDate = new Date(endDate);
      const allDatesInRange = [];

      while (currentDate <= lastDate) {
        allDatesInRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const rangeIncludesDisabled = allDatesInRange.some((date) =>
        isDateDisabled(date)
      );

      if (rangeIncludesDisabled) {
        console.log(
          "You cannot select this date range because it contains disabled dates."
        );
        return;
      }

      const formattedStartDate = `${startDate.year}-${String(
        startDate.month.index + 1
      ).padStart(2, "0")}-${String(startDate.day).padStart(2, "0")}`;
      const formattedEndDate = `${endDate.year}-${String(
        endDate.month.index + 1
      ).padStart(2, "0")}-${String(endDate.day).padStart(2, "0")}`;
      const start = new Date(formattedStartDate);
      const end = new Date(formattedEndDate);

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
        mapDays={({ date }) => {
          let props = {};
          card?.prices?.forEach((price) => {
            const startDate = new Date(price.start_date);
            const endDate = new Date(price.end_date);

            if (date >= startDate && date <= endDate) {
              props.className = "special-date";
              props.style = {
                fontWeight: "bold",
                border: "1px solid #028139",
                color: "#028139",
              };
            }
          });

          if (isDateDisabled(date)) {
            props.className = props.className
              ? `${props.className} disabled-date`
              : "disabled-date";
            props.onClick = () => {}; // Disable click event
          }

          return props;
        }}
      />
    </div>
  );
}
