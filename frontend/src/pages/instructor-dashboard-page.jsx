import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLayout } from "../components/page-layout";
import { InstructorSideBar } from "../components/navigation/desktop/instructor-side-bar";
import { NotFound } from "../components/not-found";

export const InstructorDashboardPage = () => {
  const { user, isAuthenticated } = useAuth0();

  if (user["user_type"] === "instructors" && isAuthenticated) {
    return (
      <PageLayout>
        <InstructorSideBar />
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
