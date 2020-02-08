import React, { useState, useEffect } from "react";
import { CalendarContext } from "../../shared/contexts/calendar-context";
import CalendarHeader from "../components/CalendarHeader";
import Week from "../components/Week";
import DayAppointment from "../components/DayAppointment";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import "./Calendar.css";
import { useCalendar } from "../../shared/hooks/calendar-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const {
    formattedMonth,
    currentYear,
    setNextMonth,
    setPreviousMonth,
    allweeks,
    openAppointment,
    clickedDay,
    appointmentOpen,
    positionX,
    positionY,
    currentMonth,
    closeAppointment
  } = useCalendar();

  const { loading, error, clearError, makeRequest } = useHttpClient();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await makeRequest(
          "/events",
          "get",
          null,
          {},
          {
            month: currentMonth,
            year: currentYear
          }
        );
        setEvents(response.events);
      } catch (e) {}
    };
    fetchEvents();
  }, [makeRequest, currentMonth, currentYear]);

  const createAppointment = async appointment => {
    closeAppointment();
    try {
      console.log(appointment);
      if (appointment.id) {
        await makeRequest(`/events/${appointment.id}`, "patch", {
          ...appointment
        });
        const eve = events.filter(e => e.id !== appointment.id);
        setEvents([{ ...appointment }, ...eve]);
      } else {
        const response = await makeRequest("/events", "post", {
          ...appointment
        });
        setEvents([{ ...response.event }, ...events]);
      }
    } catch (e) {}
  };

  return (
    <CalendarContext.Provider value={{ openAppointment, events }}>
      <ErrorModal error={error} onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <div className="calendar">
        <CalendarHeader
          month={`${formattedMonth} - ${currentYear}`}
          setNextMonth={setNextMonth}
          setPreviousMonth={setPreviousMonth}
        />
        <div className="calendar__weeks">
          {allweeks.map((week, index) => {
            return <Week key={index} week={week} />;
          })}
          <DayAppointment
            day={clickedDay}
            isActive={appointmentOpen}
            positionX={positionX}
            positionY={positionY}
            createAppointment={createAppointment}
            closeAppointment={closeAppointment}
          />
        </div>
      </div>
    </CalendarContext.Provider>
  );
}
