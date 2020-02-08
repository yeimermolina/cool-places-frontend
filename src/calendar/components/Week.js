import React from "react";
import Day from "./Day";
import "./Week.css";

export default function Week({ week }) {
  return (
    <div className="week">
      {week.map((day, index) => {
        return <Day day={day} key={index} />;
      })}
    </div>
  );
}
