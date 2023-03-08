import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { PageLayout } from "../components/page-layout";
import { StaffSideBar } from "../components/navigation/desktop/staff-side-bar";
import { NotFound } from "../components/not-found";
import axios from "axios";

export const DashboardPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [classes, setClasses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState("Students");

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
            "https://api.ecolio.live/api/v1/users",
            {
              headers: {
                Authorization: token,
                user_type: "students",
              },
            }
          );
          const data = await response.data;
          setUsers(data.users);
        } catch (error) {
          console.log(error.response.data);
          alert("There is a problem fetching students");
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
            "https://api.ecolio.live/api/v1/classes",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const data = await response.data;
          setClasses(data.classes);
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

  function getNameById(id, users) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i].first_name + " " + users[i].last_name;
      }
    }
    return "Not Found";
  }

  function getNamesById(ids, users) {
    const names = [];
    const idsArray = JSON.parse(ids.replace(/'/g, '"'));
    for (let i = 0; i < idsArray.length; i++) {
      const id = idsArray[i];
      const user = users.find((user) => user.id === id);
      if (user) {
        names.push({ id: id, name: `${user.first_name} ${user.last_name}` });
      }
    }
    return names;
  }

  function switchIn() {
    setToggle("Instructors");
  }

  function switchSt() {
    setToggle("Students");
  }

  if (user["user_type"] === "admin" && isAuthenticated) {
    return (
      <PageLayout>
        <StaffSideBar />
        <div className="text-black">
          <div className="mb-8 p-5 rounded-xl userspage">
            <h1 className="text-3xl text-center font-bold mb-4">
              ANNOUNCMENTS
            </h1>
            <table className="w-full text-sm text-left text-black rounded-2xl">
              <thead className="text-xl text-gray-50 uppercase bg-gray-700 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((a) => (
                  <tr key={a.id} className="bg-white border-b text-lg">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {a.id}
                    </th>
                    <td className="px-6 py-4 text-lg">{a.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-8 rounded-2xl userspage p-5">
            <div className="mb-5">
              <button
                onClick={switchIn}
                className={
                  toggle === "Instructors"
                    ? "bg-slate-800 p-2 text-white text-xl font-bold rounded-l-xl"
                    : "bg-white p-2 text-black text-xl font-bold rounded-l-xl"
                }
              >
                Instructors
              </button>
              <button
                onClick={switchSt}
                className={
                  toggle === "Students"
                    ? "bg-slate-800 p-2 text-white text-xl font-bold rounded-r-xl"
                    : "bg-white p-2 text-black text-xl font-bold rounded-r-xl"
                }
              >
                Students
              </button>
            </div>
            {toggle === "Instructors" ? (
              <table className="w-full text-sm text-left text-black">
                <thead className="text-xl text-gray-50 uppercase bg-gray-700 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      First Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Last Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((user) => (
                    <tr key={user.id} className=" bg-white border-b text-lg">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {user.id}
                      </th>
                      <td className="px-6 py-4 text-lg">{user.first_name}</td>
                      <td className="px-6 py-4 text-lg">{user.last_name}</td>
                      <td className="px-6 py-4 text-lg">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm text-left text-black">
                <thead className="text-xl text-gray-50 uppercase bg-gray-700 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      First Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Last Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className=" bg-white border-b text-lg">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {user.id}
                      </th>
                      <td className="px-6 py-4 text-lg">{user.first_name}</td>
                      <td className="px-6 py-4 text-lg">{user.last_name}</td>
                      <td className="px-6 py-4 text-lg">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="mb-8 p-5 rounded-xl userspage">
            <h1 className="text-3xl text-center font-bold mb-4">CLASSES</h1>
            <table className="w-full text-sm text-left text-black ">
              <thead className="text-xl text-gray-50 uppercase bg-gray-700 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Instructor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Students
                  </th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classs) => (
                  <tr key={classs.id} className="bg-white border-b text-lg">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {classs.id}
                    </th>
                    <td className="px-6 py-4 text-lg">{classs.name}</td>
                    <td className="px-6 py-4 text-lg">
                      {getNameById(classs.instructor, instructors)}
                    </td>
                    <td className="px-6 py-4 text-lg">
                      <div className="dropdown">
                        <label>
                          Students List
                          <ul className="dropdown-content ">
                            {getNamesById(classs.students, users).map(
                              (user) => (
                                <li
                                  key={`new-${user.name}`}
                                  className="flex justify-between m-2"
                                >
                                  <label>{user.name}</label>
                                </li>
                              )
                            )}
                          </ul>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageLayout>
    );
  } else {
    return <NotFound />;
  }
};
