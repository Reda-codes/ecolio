import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLayout } from "../components/page-layout";
import { StaffSideBar } from "../components/navigation/desktop/staff-side-bar";
import { UsersForm } from "../components/users-form";
import { NotFound } from "../components/not-found";

export const UsersPage = () => {
  const { user } = useAuth0();

  if (user["user_type"] === "admin") {
    return (
      <PageLayout>
        <StaffSideBar />
        <div className="">
          <UsersForm />
        </div>
      </PageLayout>
    );
  } else {
    return <NotFound />;
  }
};
