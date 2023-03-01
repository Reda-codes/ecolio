import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLayout } from "../components/page-layout";
import { InstructorSideBar } from "../components/navigation/desktop/instructor-side-bar";
import { NotFound } from "../components/not-found";
import { NotesForm } from "../components/notes-form";

export const NotesPage = () => {
  const { user } = useAuth0();

  if (user["user_type"] === "instructors") {
    return (
      <PageLayout>
        <InstructorSideBar />
        <NotesForm />
      </PageLayout>
    );
  } else {
    return <NotFound />;
  }
};
