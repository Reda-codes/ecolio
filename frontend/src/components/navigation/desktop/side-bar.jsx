import React from "react";
import { LogoutButton } from "../../buttons/logout-button";

export const SideBar = ({ children }) => {
  return (
    <div className="bg-blue-900 fixed top-0 left-0 rounded-r-3xl w-1/6">
      <nav className="flex flex-col justify-between min-h-screen">
        <div>
          <div className="bg-white m-8 rounded-3xl">
            <img
              className="mx-auto p-5"
              src="/logo-no-background.png"
              alt="Auth0 shield logo"
              width="300"
              height="50"
            />
          </div>
          <div className="flex flex-col">{children}</div>
        </div>
        <div className="mx-auto mb-3 w-9/12">
          <LogoutButton />
        </div>
      </nav>
    </div>
  );
};
