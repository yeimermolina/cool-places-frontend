import React from "react";
import moment from "moment";
import "./CalendarHeader.css";

const weekDays = moment.weekdays();

const WeekDays = () => {
  return (
    <div className="week-days">
      {weekDays.slice(1).map(day => (
        <div key={day}>{day}</div>
      ))}
      <div>{weekDays[0]}</div>
    </div>
  );
};

const Month = ({ month, setNextMonth, setPreviousMonth }) => {
  return (
    <div className="month">
      <div className="month__action" onClick={setPreviousMonth}>
        Prev
      </div>
      <div className="month__name">{month}</div>
      <div className="month__action" onClick={setNextMonth}>
        Next
      </div>
    </div>
  );
};

export default function CalendarHeader({
  month,
  setNextMonth,
  setPreviousMonth
}) {
  return (
    <div className="calendar-header">
      <Month
        month={month}
        setNextMonth={setNextMonth}
        setPreviousMonth={setPreviousMonth}
      />
      <WeekDays />
    </div>
  );
}
