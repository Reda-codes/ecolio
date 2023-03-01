import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export function InClassesForm() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classInfo, setClassInfo] = useState({
    id: "",
    homework: [],
  });

  function getNamesById(ids, users) {
    const names = [];
    const idsArray = ids;
    for (let i = 0; i < idsArray.length; i++) {
      const id = idsArray[i];
      const user = users.find((user) => user.id === id);
      if (user) {
        names.push({ id: id, name: `${user.first_name} ${user.last_name}` });
      }
    }
    return names;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClassInfo((prevClassInfo) => ({
      ...prevClassInfo,
      [name]: value,
    }));
  };

  const handleClassChange = (event) => {
    const { value, checked } = event.target;
    setClassInfo((prevClassInfo) => ({
      ...prevClassInfo,
      id: checked ? value : "",
    }));
  };

  function removeFromClass(arr, id, hw) {
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
  }

  function addHomework(class_id) {
    if (window.confirm("Are you sure you want to add this user?")) {
      const token = "Bearer " + message.replace(/['"]+/g, "");
      axios
        .post(
          "https://api.ecolio.live/api/v1/classes/homework/" + class_id,
          { homework: classInfo.homework },
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
            setClasses(addToHomework(classes, class_id, classInfo.homework));
          }
          // handle success
        })
        .catch((error) => {
          console.log(error.response.data);
          // handle error
        });
    }
  }

  function removeHomrwork(class_id, homework) {
    if (
      window.confirm("Are you sure you want to permanently delete this user?")
    ) {
      const token = "Bearer " + message.replace(/['"]+/g, "");
      axios
        .put(
          "https://api.ecolio.live/api/v1/classes/homework/" + class_id,
          { homework: homework },
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
            setClasses(removeFromClass(classes, class_id, classInfo.homework));
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
      const id = user.sub;

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
        }
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
          <div className="w-1/2 ">
            <div className="p-2">
              <label className="block text-2xl font-bold">Homework:</label>
              <input
                type="text"
                name="homework"
                value={classInfo.homework}
                onChange={handleChange}
                required
                className="w-full h-10 p-2 rounded-lg border-2"
              />
            </div>
            <div className="p-2 flex justify-around mb-8">
              <div className="dropdown p-2 bg-white rounded-lg w-1/4 text-center hover:bg-orange-400">
                <label>
                  <span className="text-2xl font-bold">Select A Class</span>
                  <ul className="dropdown-content text-left rounded-xl">
                    {classes.map((c) => (
                      <li key={c.id} className="p-2 ">
                        <label>
                          <input
                            type="radio"
                            name="classes"
                            value={c.id}
                            onChange={handleClassChange}
                            checked={classInfo.id.includes(c.id)}
                          />
                          {`${c.name}`}
                        </label>
                      </li>
                    ))}
                  </ul>
                </label>
              </div>
            </div>
            <button
              className="block p-2 mx-auto w-1/2 text-3xl  text-white font-bold bg-red-500 rounded-xl"
              onClick={() => {
                addHomework(classInfo.id);
              }}
            >
              Add Homework
            </button>
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
      </div>
    </>
  );
}
