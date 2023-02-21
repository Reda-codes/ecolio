import React from "react";
import { NavLink } from "react-router-dom";

export const SideBarTab = ({ path, label }) => {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        isActive
          ? "text-3xl text-white font-bold"
          : "text-3xl text-Zinc-800 font-bold"
      }
    >
      {label}
    </NavLink>
  );
};
