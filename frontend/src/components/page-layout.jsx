import React from "react";
/* import { MobileNavBar } from "./navigation/mobile/mobile-nav-bar"; */
import { Footer } from "./footer";
import { TopBar } from "./top-bar";

export const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full h-full page-layout">
      <TopBar />
      {/* <MobileNavBar /> */}
      <div className="page-layout__content">{children}</div>
      <Footer />
    </div>
  );
};
