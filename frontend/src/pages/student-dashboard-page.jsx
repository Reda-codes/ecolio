import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLayout } from "../components/page-layout";
import { StudentSideBar } from "../components/navigation/desktop/student-side-bar";
import { NotFound } from "../components/not-found";

export const StudentDashboardPage = () => {
  const { user, isAuthenticated } = useAuth0();

  if (user["user_type"] === "students" && isAuthenticated) {
    return (
      <PageLayout>
        <StudentSideBar />
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
