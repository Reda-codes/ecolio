import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLayout } from "../components/page-layout";
import { SideBar } from "../components/navigation/desktop/side-bar";
import { SideBarTab } from "../components/navigation/desktop/side-bar-tab";

export const DashboardPage = () => {
  const { user } = useAuth0();

  if (user["user_type"] === "admin") {
    return (
      <PageLayout>
        <SideBar>
          <div className="mx-auto pb-4">
            <SideBarTab path="/dashboard" label="Dashboard" />
          </div>
          <div className="mx-auto pb-4">
            <SideBarTab path="/profile" label="Profile" />
          </div>
          <div className="mx-auto pb-4">
            <SideBarTab path="/users" label="Users" />
          </div>
          <div className="mx-auto pb-4">
            <SideBarTab path="/classes" label="Classes" />
          </div>
        </SideBar>
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
    return (
      <PageLayout>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Not Authorized
          </h1>
        </div>
      </PageLayout>
    );
  }
};
