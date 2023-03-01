import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <button
      className="w-1/6  bg-blue-500 hover:bg-green-700 text-white font-bold p-4 rounded-3xl text-4xl mx-auto"
      onClick={handleLogin}
    >
      Log In
    </button>
  );
};
