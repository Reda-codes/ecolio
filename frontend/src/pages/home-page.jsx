import React from "react";
import { LoginButton } from "../components/buttons/login-button";

export const HomePage = () => (
  <div className="flex flex-col justify-center homapage h-full">
    <div className="bg-white m-8 rounded-3xl w-500 mx-auto shadow-2xl">
      <img
        className="p-5"
        src="/logo-no-background.png"
        alt="Auth0 shield logo"
        width="500"
        height="100"
      />
    </div>
    <LoginButton />
  </div>
);
