import { createContext } from "react";

export const CalendarContext = createContext({
  openAppointment: null,
  events: []
});
