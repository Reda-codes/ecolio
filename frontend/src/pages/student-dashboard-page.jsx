import React from "react";
import { PageLayout } from "../components/page-layout";

export const StudentDashboardPage = () => {
  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Dashboard
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>Your user type is Student</span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};
