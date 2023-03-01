import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button
      className="w-full  bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl text-4xl"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};
