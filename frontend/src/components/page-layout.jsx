import React from "react";
import { Footer } from "../components/footer";
import { TopBar } from "../components/top-bar";

export const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full h-full page-layout">
      <TopBar />
      <div className="page-layout__content">{children}</div>
      <Footer />
    </div>
  );
};
