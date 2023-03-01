import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export function NotesForm() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [noteInfo, setNoteInfo] = useState({
    instructor_name: `${user.given_name} ${user.family_name}`,
    student_id: "",
    description: "",
  });

  function getNameById(id, users) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i].first_name + " " + users[i].last_name;
      }
    }
    return "Select a Student";
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNoteInfo((prevClassInfo) => ({
      ...prevClassInfo,
      [name]: value,
    }));
  };

  const handleNoteChange = (event) => {
    const { value, checked } = event.target;
    setNoteInfo((prevNoteInfo) => ({
      ...prevNoteInfo,
      student_id: checked ? value : "",
    }));
  };

  /* function removeFromClass(arr, id, hw) {
    const result = arr.map((elem) => {
      if (elem.id === id) {
        let index = elem.homework.indexOf(hw);
        if (index > -1) {
          elem.homework.splice(index, 1);
        }
      }
      return elem;
    });
    return result;
  }

  function addToHomework(arr, id, newHomework) {
    const result = arr.map((elem) => {
      if (elem.id === id) {
        elem.homework.push(newHomework);
      }
      return elem;
    });
    return result;
  } */

  function addNote(e) {
    e.preventDefault();
    if (noteInfo.student_id === "") {
      alert("Please Select a Student");
    } else {
      const token = "Bearer " + message.replace(/['"]+/g, "");
      axios
        .post(
          " http://127.0.0.1:8000/api/v1/notes",
          {
            instructor_name: noteInfo.instructor_name,
            student_id: noteInfo.student_id,
            description: noteInfo.description,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response) {
            console.log(response.data);
            /* setClasses(addToHomework(classes, class_id, classInfo.homework)); */
          }
          // handle success
        })
        .catch((error) => {
          console.log(error.response.data);
          // handle error
        });
    }
  }

  /* function removeNote(id) {
    if (
      window.confirm("Are you sure you want to permanently delete this user?")
    ) {
      const token = "Bearer " + message.replace(/['"]+/g, "");
      axios
        .put(
          "https://api.ecolio.live/api/v1/notes" + id,
          { request: "Delete" },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          if (response) {
            console.log(response.data);
            setClasses(removeFromClass(classes, class_id, classInfo.homework));
          }
          // handle success
        })
        .catch((error) => {
          console.log(error.response.data);
          // handle error
        });
    }
  } */

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

        /* try {
          const response = await axios.get(
            "https://api.ecolio.live/api/v1/classes/instructor/" + id,
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
          alert("There is a problem fetching instructors");
        } */
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, message, user]);
  return (
    <>
      <div className="mb-8 overflow-visible z-20">
        <div className="text-black p-8 userspage rounded-2xl drop-shadow-xl flex">
          <form className="w-1/2 " onSubmit={addNote}>
            <div className="p-2 mb-8 flex flex-col">
              <div className="dropdown p-2 bg-white w-1/2 mx-auto rounded-lg text-center hover:bg-orange-400">
                <label>
                  <span className="text-2xl font-bold">
                    {getNameById(noteInfo.student_id, users)}
                  </span>
                  <ul className="dropdown-content text-left rounded-xl">
                    {users.map((u) => (
                      <li key={u.id} className="p-2 ">
                        <label>
                          <input
                            type="radio"
                            name="id"
                            value={u.id}
                            onChange={handleNoteChange}
                            checked={noteInfo.student_id.includes(u.id)}
                          />
                          {getNameById(u.id, users)}
                        </label>
                      </li>
                    ))}
                  </ul>
                </label>
              </div>
              <div className="p-2">
                <label className="block text-2xl font-bold">Note:</label>
                <input
                  type="text"
                  name="description"
                  value={noteInfo.description}
                  onChange={handleChange}
                  required
                  className="w-full h-10 p-2 rounded-lg border-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="block p-2 mx-auto w-1/2 text-3xl  text-white font-bold bg-red-500 rounded-xl"
            >
              Add Homework
            </button>
          </form>
        </div>
      </div>
      {/* <div className="relative w-full overflow-visible z-10 shadow-x">
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
                Homework
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
                <td className="px-6 py-4 text-lg">{user.sub}</td>
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
                          </li>
                        ))}
                      </ul>
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 text-lg">
                  <div className="dropdown">
                    <label>
                      Homewrok List
                      <ul className="dropdown-content">
                        {classs.homework.map((h) => (
                          <li
                            key={`new-${h}`}
                            className="flex justify-between border-black border p-2"
                          >
                            <label>{h}</label>
                            <button
                              className="font-bold text-xl text-red-500"
                              onClick={() => {
                                removeHomrwork(classs.id, h);
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
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
}
