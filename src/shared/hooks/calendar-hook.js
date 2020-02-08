import { useState, useEffect, useCallback } from "react";
import moment from "moment";

export const useCalendar = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState();

  const [currentYear, setCurrentYear] = useState(
    parseInt(moment().format("YYYY"))
  );
  const [currentMonth, setCurrentMonth] = useState(
    parseInt(moment().format("M"))
  );

  const formattedMonth = moment(
    `${currentYear}-${currentMonth}-1`,
    "YYYY-M-D"
  ).format("MMMM");

  const [allweeks, setWeeks] = useState([]);

  const generateWeeks = useCallback((month, year) => {
    const days = [];
    const weeks = [];
    const day = moment(`${year}-${month}-1`, "YYYY-M-D");

    for (let i = 1; i <= day.daysInMonth(); i += 1) {
      const currentDay = moment(`${year}-${month}-${i}`, "YYYY-M-D");
      days.push(currentDay);
    }

    let firstDayOfMonth = moment(days[0]);

    if (firstDayOfMonth.day() !== 1) {
      do {
        firstDayOfMonth = moment(firstDayOfMonth).subtract(1, "days");
        days.unshift(firstDayOfMonth);
      } while (firstDayOfMonth.day() !== 1);
    }

    let lastDayOfMonth = moment(days[days.length - 1]);

    if (lastDayOfMonth.day() !== 0) {
      do {
        lastDayOfMonth = moment(lastDayOfMonth).add(1, "days");
        days.push(lastDayOfMonth);
      } while (lastDayOfMonth.day() !== 0);
    }

    let w = [];
    for (let day of days) {
      w.push(day);

      if (w.length === 7) {
        weeks.push(w);
        w = [];
      }
    }

    return weeks;
  }, []);

  useEffect(() => {
    const allWeeks = generateWeeks(currentMonth, currentYear);
    setWeeks(allWeeks);
  }, [currentMonth, currentYear, generateWeeks]);

  const closeAppointment = () => {
    setAppointmentOpen(false);
  };

  const setNextMonth = () => {
    closeAppointment();
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(prevMonth => prevMonth + 1);
    }
  };

  const setPreviousMonth = () => {
    closeAppointment();
    if (currentMonth === 1) {
      setCurrentYear(prevYear => prevYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(prevMonth => prevMonth - 1);
    }
  };

  const openAppointment = (top, left, appointment) => {
    setPositionX(left);
    setPositionY(top);
    setAppointmentOpen(true);
    setClickedDay(appointment);
  };

  return {
    openAppointment,
    setPreviousMonth,
    setNextMonth,
    allweeks,
    positionX,
    positionY,
    appointmentOpen,
    clickedDay,
    formattedMonth,
    currentYear,
    currentMonth,
    closeAppointment
  };
};
