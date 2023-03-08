import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { DashboardPage } from "./pages/dashboard-page";
import { UsersPage } from "./pages/users-page";
import { StudentDashboardPage } from "./pages/student-dashboard-page";
import { InstructorDashboardPage } from "./pages/instructor-dashboard-page";
import { StaffClassesPage } from "./pages/staff-classes-page";
import { InstructorsClassesPage } from "./pages/instructors-classes-page";
import { AnnouncementsPage } from "./pages/announcements-page";
import { NotesPage } from "./pages/notes-page";

export const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  } else if (isAuthenticated && user.user_type === "admin") {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={ProfilePage} />}
        />
        <Route
          path="/announcements"
          element={<AuthenticationGuard component={AnnouncementsPage} />}
        />
        <Route
          path="/dashboard"
          element={<AuthenticationGuard component={DashboardPage} />}
        />
        <Route
          path="/users"
          element={<AuthenticationGuard component={UsersPage} />}
        />
        <Route
          path="/classes"
          element={<AuthenticationGuard component={StaffClassesPage} />}
        />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  } else if (isAuthenticated && user.user_type === "students") {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={ProfilePage} />}
        />
        <Route
          path="/dashboard"
          element={<AuthenticationGuard component={StudentDashboardPage} />}
        />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  } else if (isAuthenticated && user.user_type === "instructors") {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={ProfilePage} />}
        />
        <Route
          path="/dashboard"
          element={<AuthenticationGuard component={InstructorDashboardPage} />}
        />
        <Route
          path="/classes"
          element={<AuthenticationGuard component={InstructorsClassesPage} />}
        />
        <Route
          path="/notes"
          element={<AuthenticationGuard component={NotesPage} />}
        />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }
};
