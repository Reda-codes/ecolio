import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageLayout } from "../components/page-layout";
import { StudentSideBar } from "../components/navigation/desktop/student-side-bar";
import { NotFound } from "../components/not-found";

export const StudentDashboardPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [notes, setNotes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  function getNameById(id, users) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i].first_name + " " + users[i].last_name;
      }
    }
    return "Not Found";
  }

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();

      if (!isMounted) {
        return;
      }

      if (accessToken) {
        setMessage(JSON.stringify(accessToken));
      }

      if (message) {
        const token = "Bearer " + message.replace(/['"]+/g, "");

        try {
          const response = await axios.get(
            "https://api.ecolio.live/api/v1/notes/student/" + user.sub,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const data = await response.data;
          setNotes(data);
        } catch (error) {
          console.log(error.response.data);
          alert("There is a problem fetching Notes");
        }

        try {
          const response = await axios.get(
            "https://api.ecolio.live/api/v1/announcements/",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const data = await response.data;
          setAnnouncements(data.announcements);
        } catch (error) {
          console.log(error.response.data);
          alert("There is a problem fetching Notes");
        }

        try {
          const response = await axios.get(
            "https://api.ecolio.live/api/v1/classes/student/" + user.sub,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const data = await response.data;
          setClasses(data);
        } catch (error) {
          console.log(error.response.data);
          alert("There is a problem fetching Notes");
        }

        try {
          const response = await axios.get(
            "https://api.ecolio.live/api/v1/users",
            {
              headers: {
                Authorization: token,
                user_type: "instructors",
              },
            }
          );
          const data = await response.data;
          setInstructors(data.users);
        } catch (error) {
          console.log(error.response.data);
          alert("There is a problem");
        }
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, message, user]);

  if (user["user_type"] === "students" && isAuthenticated) {
    return (
      <PageLayout>
        <StudentSideBar />
        <div className="text-black">
          <div className="flex">
            <div className="w-1/2 userspage m-5 p-5 rounded-2xl drop-shadow-xl">
              <h1 className="text-center text-3xl font-bold font-mono">
                SCHOOL ANNOUNCEMENTS
              </h1>
              <ul>
                {announcements.map((a) => (
                  <li
                    className="bg-white p-2 pl-4 rounded-xl m-2 text-lg"
                    key={a.id}
                  >
                    {a.description}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2 userspage m-5 p-5 rounded-2xl drop-shadow-xl">
              <h1 className="text-center text-3xl font-bold font-mono">
                INSTRUCTORS NOTES
              </h1>
              <ul>
                {notes.map((n) => (
                  <li
                    className="bg-white p-4 rounded-xl m-2 mb-5 text-lg"
                    key={n.id}
                  >
                    <span className="rounded-md p-2 bg-cyan-600 text-white font-bolde text-lg">
                      {n.instructor_name}
                    </span>
                    <span className="ml-3">{n.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap m-5 userspage p-5 rounded-2xl">
            {classes.map((c) => (
              <div key={c.id} className="w-1/3 p-5 flex-none">
                <div className="p-5 rounded-2xl text-white bg-cyan-700 drop-shadow-xl">
                  <ul>
                    <li className="userspage p-2 rounded-2xl w-1/2 mx-auto text-center text-xl font-bold text-black">
                      {c.name}
                    </li>
                    <li className="text-xl font-bold m-2">
                      Instructor: {getNameById(c.instructor, instructors)}
                    </li>
                    <li className="text-xl font-bold m-2">
                      Room Number: {c.room_number}
                    </li>
                    <li className="text-xl font-bold m-2">
                      Class description: {c.description}
                    </li>
                  </ul>
                  <h1 className="text-xl font-bold m-2">HOMEWORK:</h1>
                  {c.homework.length > 0 ? (
                    <ul className="p-5 rounded-2xl bg-gray-50 text-black">
                      {c.homework.map((h, index) => (
                        <li className="font-bold text-xl" key={index}>
                          {h}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-5 rounded-2xl bg-gray-50 text-black font-bold text-center text-xl">
                      No Homework was Assigned
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageLayout>
    );
  } else {
    return <NotFound />;
  }
};
