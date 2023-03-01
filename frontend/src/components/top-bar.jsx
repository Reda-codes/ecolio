import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const TopBar = () => {
  const { user } = useAuth0();

  const d = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <header className="flex justify-between w-10/12 bg-blue-500 font-medium text-3xl leading-10 rounded-b-3xl p-5 shadow-2xl">
      <p className="text-white">
        Hi, {user["user_name"] ? user["user_name"] : "Admin"}
      </p>
      <p className="text-white">
        {daysOfWeek[d.getDay()]}, {monthsOfYear[d.getMonth()]} {d.getDate()}
      </p>
    </header>
  );
};
