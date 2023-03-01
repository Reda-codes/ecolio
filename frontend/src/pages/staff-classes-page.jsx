import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLayout } from "../components/page-layout";
import { StaffSideBar } from "../components/navigation/desktop/staff-side-bar";
import { NotFound } from "../components/not-found";
import { ClassesForm } from "../components/classes-form";

export const StaffClassesPage = () => {
  const { user } = useAuth0();

  if (user["user_type"] === "admin") {
    return (
      <PageLayout>
        <StaffSideBar />
        <ClassesForm />
      </PageLayout>
    );
  } else {
    return <NotFound />;
  }
};
