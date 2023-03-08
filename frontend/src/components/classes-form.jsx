import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export function ClassesForm() {
  const { getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState(null);
  const [classInfo, setClassInfo] = useState({
    name: "",
    description: "",
    instructor: "",
    room_number: "",
    students: [],
    homework: [],
  });
  const [users, setUsers] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [render, setRender] = useState("");

  const handleClassSelection = (id) => {
    const classId = id;
    setSelectedClass(classes.find((c) => c.id === classId));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClassInfo((prevClassInfo) => ({
      ...prevClassInfo,
      [name]: value,
    }));
  };

  const handleInstructorChange = (event) => {
    const { value, checked } = event.target;
    setClassInfo((prevClassInfo) => ({
      ...prevClassInfo,
      instructor: checked
        ? [...prevClassInfo.instructor, value]
        : prevClassInfo.instructor.filter((id) => id !== value),
    }));
  };

  const handleStudentChange = (event) => {
    const { value, checked } = event.target;
    setClassInfo((prevClassInfo) => ({
      ...prevClassInfo,
      students: checked
        ? [...prevClassInfo.students, value]
        : prevClassInfo.students.filter((id) => id !== value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = "Bearer " + message.replace(/['"]+/g, "");
    const formData = new FormData();
    formData.append("name", classInfo.name);
    formData.append("description", classInfo.description);
    formData.append("instructor", classInfo.instructor);
    formData.append("room_number", classInfo.room_number);
    formData.append("students", JSON.stringify(classInfo.students));
    formData.append("homework", JSON.stringify(classInfo.homework));
    axios
      .post("https://api.ecolio.live/api/v1/classes", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response) {
          console.log(response.data);
          setRender(new Date());
        }
        // handle success
      })
      .catch((error) => {
        console.log(error.response.data);
        // handle error
      });
  };

  const handleClassDelete = (id) => {
    if (
      window.confirm("Are you sure you want to permanently delete this Class?")
    ) {
      const token = "Bearer " + message.replace(/['"]+/g, "");
      axios
        .delete("https://api.ecolio.live/api/v1/classes/" + id, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response) {
            console.log(response.data);
            setRender(new Date());
          }
          // handle success
        })
        .catch((error) => {
          console.log(error.response.data);
          // handle error
        });
    }
  };

  function getNameById(id, users) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i].first_name + " " + users[i].last_name;
      }
    }
    return "User not found";
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

  function removeStudent(class_id, student_id) {
    if (
      window.confirm("Are you sure you want to permanently delete this user?")
    ) {
      const token = "Bearer " + message.replace(/['"]+/g, "");
      axios
        .put(
          "https://api.ecolio.live/api/v1/classes/student/" +
            class_id +
            "/" +
            student_id,
          { title: "PUT Request" },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          if (response) {
            console.log(response.data);
            setRender(new Date());
          }
          // handle success
        })
        .catch((error) => {
          console.log(error.response.data);
          // handle error
        });
    }
  }

  function addUserToClass(class_id, student_id) {
    if (window.confirm("Are you sure you want to add this user?")) {
      const token = "Bearer " + message.replace(/['"]+/g, "");
      axios
        .post(
          "https://api.ecolio.live/api/v1/classes/student/" +
            class_id +
            "/" +
            student_id,
          { title: "POST Request" },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          if (response) {
            console.log(response.data);
            setRender(new Date());
          }
          // handle success
        })
        .catch((error) => {
          console.log(error.response.data);
          // handle error
        });
    }
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
          alert("There is a problem");
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
          alert("There is a problem fetching instructors");
        }
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, message, render]);
  return (
    <>
      <div className="mb-8 overflow-visible z-20">
        <div className="text-black p-8 userspage rounded-2xl drop-shadow-xl flex">
          <form onSubmit={handleSubmit} className="w-1/2 ">
            <div className="p-2">
              <label className="block text-2xl font-bold">Name:</label>
              <input
                type="text"
                name="name"
                value={classInfo.name}
                onChange={handleChange}
                required
                className="w-full h-10 p-2 rounded-lg border-2"
              />
            </div>
            <div className="p-2">
              <label className="block text-2xl font-bold">Description:</label>
              <input
                type="textarea"
                name="description"
                value={classInfo.description}
                onChange={handleChange}
                required
                className="w-full h-10 p-2 rounded-lg border-2"
              />
            </div>
            <div className="p-2">
              <label className="block text-2xl font-bold">Room Number:</label>
              <input
                type="text"
                name="room_number"
                value={classInfo.room_number}
                onChange={handleChange}
                required
                className="w-full h-10 p-2 rounded-lg border-2"
              />
            </div>
            <div className="p-2 flex justify-around mb-8">
              <div className="dropdown p-2 bg-white rounded-lg w-1/4 text-center hover:bg-orange-400">
                <label>
                  <span className="text-2xl font-bold">Instructor</span>
                  <ul className="dropdown-content text-left p-2 rounded-xl">
                    {instructors.map((user) => (
                      <li key={user.id}>
                        <label>
                          <input
                            type="radio"
                            name="students"
                            value={user.id}
                            onChange={handleInstructorChange}
                            checked={classInfo.instructor.includes(user.id)}
                          />
                          {`${user.first_name} ${user.last_name}`}
                        </label>
                      </li>
                    ))}
                  </ul>
                </label>
              </div>
              <div className="dropdown p-2 bg-white rounded-lg w-1/4 text-center hover:bg-orange-400">
                <label>
                  <span className="text-2xl font-bold">Students</span>
                  <ul className="dropdown-content text-left p-2 rounded-xl">
                    {users.map((user) => (
                      <li key={user.id}>
                        <label>
                          <input
                            type="checkbox"
                            name="students"
                            value={user.id}
                            onChange={handleStudentChange}
                            checked={classInfo.students.includes(user.id)}
                          />
                          {`${user.first_name} ${user.last_name}`}
                        </label>
                      </li>
                    ))}
                  </ul>
                </label>
              </div>
            </div>
            <button
              className="block p-2 mx-auto w-1/2 text-3xl  text-white font-bold bg-red-500 rounded-xl"
              type="submit"
            >
              Create Class
            </button>
          </form>
          <div className="bg-white w-1/2 mx-8 rounded-xl p-8">
            <h1 className="text-2xl font-bold text-center">
              Add New User To a Class
            </h1>
            <div>
              <h2 className="text-2xl font-bold mb-5">Select a Class:</h2>
              <div className="mb-5">
                <form className="dropdown">
                  <label>
                    <span className="text-2xl font-bold bg-slate-400 mx-5 p-2 rounded-xl">
                      Classes
                    </span>
                    <ul className="dropdown-content">
                      {classes.map((c) => (
                        <li key={c.id}>
                          <input
                            type="radio"
                            id={c.id}
                            name="class"
                            value={c.id}
                            onChange={() => {
                              handleClassSelection(c.id);
                            }}
                          />
                          <label htmlFor={c.id}>{c.name}</label>
                        </li>
                      ))}
                    </ul>
                  </label>
                </form>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-5">Select a Student:</h2>
                {selectedClass && (
                  <div className="dropdown">
                    <h2 className="text-2xl font-bold bg-slate-400 mx-5 p-2 rounded-xl">
                      Students List
                    </h2>
                    <ul className="dropdown-content">
                      {users
                        .filter((u) => !selectedClass.students.includes(u.id))
                        .map((u) => (
                          <li key={u.id} className="flex justify-between">
                            <label>{`${u.first_name} ${u.last_name}`}</label>
                            <button
                              className="font-bold text-blue-500"
                              onClick={() => {
                                addUserToClass(selectedClass.id, u.id);
                              }}
                            >
                              ADD
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full overflow-visible z-10 shadow-x">
        <h1 className="text-2xl font-bold p-5 pl-0 ">Classes List</h1>
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classs) => (
              <tr key={classs.id} className="userspage border-b text-lg">
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
                        {getNamesById(classs.students, users).map((user) => (
                          <li
                            key={`new-${user.name}`}
                            className="flex justify-between m-2"
                          >
                            <label>{user.name}</label>
                            <button
                              className="font-bold text-red-500"
                              onClick={() => {
                                removeStudent(classs.id, user.id);
                              }}
                            >
                              X
                            </button>
                          </li>
                        ))}
                      </ul>
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 text-lg">
                  <button
                    className="bg-red-500 p-2 rounded-xl font-bold text-white"
                    onClick={() => {
                      handleClassDelete(classs.id);
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
    </>
  );
}
