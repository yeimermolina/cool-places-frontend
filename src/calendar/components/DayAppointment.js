import React, { useState, useEffect } from "react";
import "./DayAppointment.css";
import Button from "../../shared/components/FormElements/Button";

export default function DayAppointment({
  positionX,
  positionY,
  day = {},
  isActive,
  createAppointment,
  closeAppointment
}) {
  const [title, setTitle] = useState(day.title || "");

  const saveAppointment = () => {
    createAppointment({
      ...day,
      title
    });
    setTitle("");
  };

  useEffect(() => {
    setTitle(day.title || "");
  }, [day]);

  return (
    <div
      className={`day-appointment ${isActive ? "day-appointment--active" : ""}`}
      style={{ top: positionY, left: positionX }}
    >
      <span className="day-appointment__close" onClick={closeAppointment}>
        x
      </span>
      <h4 className="day-appointment__title">
        {day.date && day.date.format("DD/MM/YYYY")}
      </h4>
      <div className="day-appointment__input">
        <textarea
          name="title"
          value={title}
          rows="4"
          onChange={e => setTitle(e.target.value)}
        ></textarea>
      </div>
      <Button onClick={saveAppointment}>{day.id ? "Edit" : "Add"}</Button>
    </div>
  );
}
