import React, { useContext } from "react";
import { CalendarContext } from "../../shared/contexts/calendar-context";
import "./Day.css";
import moment from "moment";

export default function Day({ day }) {
  const { openAppointment, events } = useContext(CalendarContext);
  const handleClick = (event, appointment) => {
    const left =
      event.clientX + 200 > window.innerWidth
        ? window.innerWidth - 210
        : event.clientX;

    const top =
      event.clientY + 200 > window.innerHeight
        ? window.innerHeight - 210
        : event.clientY;

    openAppointment(top, left, appointment);
  };

  const dayEvents = events.filter(event =>
    moment(event.date, "YYYY-M-D").isSame(day)
  );

  const newAppointment = e => {
    handleClick(e, {
      date: day
    });
  };

  const editAppointment = (e, appointment) => {
    e.stopPropagation();
    handleClick(e, {
      ...appointment,
      date: moment(appointment.date, "YYYY-M-D")
    });
  };

  return (
    <div className="day" onClick={newAppointment}>
      <div className="day__number">{day.format("DD")}</div>
      <ul className="day__events">
        {dayEvents.map(appointment => (
          <li onClick={e => editAppointment(e, appointment)}>
            {appointment.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
