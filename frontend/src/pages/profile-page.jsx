import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "../components/page-layout";
import { StaffSideBar } from "../components/navigation/desktop/staff-side-bar";
import { InstructorSideBar } from "../components/navigation/desktop/instructor-side-bar";
import { StudentSideBar } from "../components/navigation/desktop/student-side-bar";
import { Profile } from "../components/profile";

export const ProfilePage = () => {
  const { user } = useAuth0();

  if (user["user_type"] === "admin") {
    return (
      <PageLayout>
        <StaffSideBar />
        <Profile />
      </PageLayout>
    );
  } else if (user["user_type"] === "students") {
    return (
      <PageLayout>
        <StudentSideBar />
        <Profile />
      </PageLayout>
    );
  } else if (user["user_type"] === "instructors") {
    return (
      <PageLayout>
        <InstructorSideBar />
        <Profile />
      </PageLayout>
    );
  }
};
