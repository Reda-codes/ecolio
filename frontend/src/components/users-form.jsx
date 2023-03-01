import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export function UsersForm() {
  const { getAccessTokenSilently } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [render, setRender] = useState("");

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
          setRender("render");
        } catch (error) {
          console.log(error.response.data);
          alert("There is a problem fetching instructors");
        }
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, message, render]);

  const handleStudentDelete = (id) => {
    /*const token = "Bearer " + message.replace(/['"]+/g, "");
     axios
      .delete("https://api.ecolio.live/api/v1/users/student/" + id, {
        headers: {
          Authorization: token,
          user_type: "students",
        },
      })
      .then((response) => {
        if (response) {
          console.log(response.data);
        }
        // handle success
      })
      .catch((error) => {
        console.log(error.response.data);
        // handle error
      }); */
    if (
      window.confirm("Are you sure you want to permanently delete this user?")
    ) {
      return console.log(id);
    }
  };

  const handleInstructorDelete = (id) => {
    if (
      window.confirm("Are you sure you want to permanently delete this user?")
    ) {
      return console.log(id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = "Bearer " + message.replace(/['"]+/g, "");
    axios
      .post(
        "https://api.ecolio.live/api/v1/users",
        {
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          user_type: userType,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data.user_id) {
          alert(`The user ${response.data.nickname} was created succesfuly`);
          setRender("Random");
        } else {
          alert(response.data.message);
        }

        // handle success
      })
      .catch((error) => {
        console.log(error.response.data);
        // handle error
      });
  };
  return (
    <>
      <div className="mb-8">
        <div className="text-black p-8 userspage rounded-2xl drop-shadow-xl flex">
          <form onSubmit={handleSubmit} className="w-1/2">
            <div className="p-2">
              <label className="block text-2xl font-bold">Email:</label>
              <input
                type="email"
                autoComplete="off"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="Enter the user email"
                className="w-full h-10 p-2 rounded-lg border-2"
              />
            </div>
            <div className="p-2">
              <label className="block text-2xl font-bold">Password:</label>
              <input
                type="password"
                autoComplete="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Enter the user Password"
                className="w-full h-10 p-2 rounded-lg border-2"
              />
            </div>
            <div className="p-2">
              <label className="block text-2xl font-bold">First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
                placeholder="Enter the user First Name"
                className="w-full h-10 p-2 rounded-lg border-2"
              />
            </div>
            <div className="p-2">
              <label className="block text-2xl font-bold">Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
                placeholder="Enter the user Last Name"
                className="w-full h-10 p-2 rounded-lg border-2"
              />
            </div>
            <div className="p-2">
              <label className="block pb-2 text-2xl font-bold">
                User Type:
              </label>
              <div className="flex justify-around w-full">
                <label className="m-4 p-2 w-1/2 rounded-lg bg-white text-lg font-bold flex justify-between">
                  <p className="leading-loose text-lg">Student</p>
                  <input
                    className="m-2"
                    type="radio"
                    name="usertype"
                    value="students"
                    onChange={(event) => setUserType(event.target.value)}
                    required
                  />
                </label>

                <label className="m-4 p-2 w-1/2 rounded-lg bg-white text-lg font-bold flex justify-between">
                  <p className="leading-loose text-lg">Instructor</p>
                  <input
                    className="m-2"
                    type="radio"
                    name="usertype"
                    value="instructors"
                    onChange={(event) => setUserType(event.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
            <button
              className="block p-2 mx-auto w-1/2 text-3xl  text-white font-bold bg-green-600 rounded-xl"
              type="submit"
            >
              Create User
            </button>
          </form>
          <div className="bg-white w-1/2 mx-8 rounded-xl p-8">
            <h1 className="text-3xl font-bold font-mono">Note:</h1>
            <p className="text-xl font-mono">
              Please Fill all user Information to succesfuly create a new user
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold p-5 pl-0 "> Instructors List</h1>
          <div className="relative overflow-x-auto shadow-xl">
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
                  <th scope="col" className="px-6 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {instructors.map((user) => (
                  <tr key={user.id} className="userspage border-b text-lg">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {user.id}
                    </th>
                    <td className="px-6 py-4 text-lg">{user.first_name}</td>
                    <td className="px-6 py-4 text-lg">{user.last_name}</td>
                    <td className="px-6 py-4 text-lg">{user.email}</td>
                    <td className="px-6 py-4 text-lg">
                      <button
                        disabled="disabled"
                        className="bg-red-200 p-2 rounded-xl font-bold text-white"
                        onClick={() => {
                          handleInstructorDelete(user.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold p-5 pl-0 "> Students List</h1>
          <div className="relative overflow-x-auto shadow-xl ">
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
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="userspage border-b text-lg">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {user.id}
                    </th>
                    <td className="px-6 py-4 text-lg">{user.first_name}</td>
                    <td className="px-6 py-4 text-lg">{user.last_name}</td>
                    <td className="px-6 py-4 text-lg">{user.email}</td>
                    <td className="px-6 py-4 text-lg">
                      <button
                        className="bg-red-500 p-2 rounded-xl font-bold text-white"
                        onClick={() => {
                          handleStudentDelete(user.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
