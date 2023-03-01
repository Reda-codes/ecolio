import React from "react";
import { NavLink } from "react-router-dom";

export function NotFound() {
  return (
    <div className="m-10">
      <h1 className=" text-black">
        Not Found, it looks like you lost your way. Click below to go back home.
      </h1>
      <NavLink
        to={"/"}
        end
        className={({ isActive }) =>
          isActive
            ? "text-3xl text-black font-bold"
            : "text-3xl text-Zinc-800 font-bold"
        }
      >
        Back Home
      </NavLink>
    </div>
  );
}
