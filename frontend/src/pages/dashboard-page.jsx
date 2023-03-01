import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLayout } from "../components/page-layout";
import { StaffSideBar } from "../components/navigation/desktop/staff-side-bar";
import { NotFound } from "../components/not-found";

export const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth0();

  if (user["user_type"] === "admin" && isAuthenticated) {
    return (
      <PageLayout>
        <StaffSideBar />
        <div className="text-black">
          <h1 id="page-title" className="">
            Dashboard
          </h1>
          <div className="text-black">
            <p id="p">
              <span>Your user type is Admin.</span>
              <span>
                <strong>Only authenticated users can access this page.</strong>
              </span>
            </p>
          </div>
        </div>
      </PageLayout>
    );
  } else {
    return <NotFound />;
  }
};
