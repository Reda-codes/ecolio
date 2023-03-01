import React from "react";
import { SideBar } from "./side-bar";
import { SideBarTab } from "./side-bar-tab";

export function StaffSideBar() {
  return (
    <SideBar>
      <div className="mx-auto pb-4">
        <SideBarTab path="/" label="Home" />
      </div>
      <div className="mx-auto pb-4">
        <SideBarTab path="/announcements" label="Announcements" />
      </div>
      <div className="mx-auto pb-4">
        <SideBarTab path="/dashboard" label="Dashboard" />
      </div>
      <div className="mx-auto pb-4">
        <SideBarTab path="/profile" label="Profile" />
      </div>
      <div className="mx-auto pb-4">
        <SideBarTab path="/users" label="Users" />
      </div>
      <div className="mx-auto pb-4">
        <SideBarTab path="/classes" label="Classes" />
      </div>
    </SideBar>
  );
}
