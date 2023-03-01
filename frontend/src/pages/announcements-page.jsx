import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { PageLayout } from "../components/page-layout";
import { StaffSideBar } from "../components/navigation/desktop/staff-side-bar";
import { NotFound } from "../components/not-found";
import axios from "axios";

export const AnnouncementsPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState(null);

  // Fetch all announcements
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
            "https://api.ecolio.live/api/v1/announcements",
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
          alert("There is a problem");
        }
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [message, getAccessTokenSilently]);

  // Create a new announcement
  const createAnnouncement = async (description) => {
    const token = "Bearer " + message.replace(/['"]+/g, "");
    axios
      .post(
        "https://api.ecolio.live/api/v1/announcements",
        {
          description: description,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAnnouncements([
          ...announcements,
          { description: response.data.description, id: response.data.id },
        ]);
        // handle success
      })
      .catch((error) => {
        console.log(error.response.data);
        // handle error
      });
  };

  function removeItemById(arr, id) {
    return arr.filter((item) => item.id !== id);
  }

  // Delete an announcement
  const handleAnnouncementDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this announcement?"
      )
    ) {
      const token = "Bearer " + message.replace(/['"]+/g, "");
      axios
        .delete("https://api.ecolio.live/api/v1/announcements/" + id, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response) {
            console.log(response.data);
            setAnnouncements(removeItemById(announcements, id));
          }
          // handle success
        })
        .catch((error) => {
          console.log(error.response.data);
          // handle error
        });
    }
  };

  if (user["user_type"] === "admin" && isAuthenticated) {
    return (
      <PageLayout>
        <StaffSideBar />
        <div>
          <div className="text-black p-8 userspage rounded-2xl drop-shadow-xl mb-8">
            <div>
              <h1 className="text-2xl font-bold text-center">
                Create a new Announcement
              </h1>
              <form
                className="flex flex-col w-1/2 mx-auto"
                onSubmit={(event) => {
                  event.preventDefault();
                  const description = event.target.elements.description.value;
                  createAnnouncement(description);
                  event.target.elements.description.value = "";
                }}
              >
                <input
                  type="text"
                  name="description"
                  className="p-2 m-8 rounded-xl"
                />
                <button
                  type="submit"
                  className="block p-2 mx-auto w-1/2 text-3xl  text-white font-bold bg-green-600 rounded-xl"
                >
                  Share Announcement
                </button>
              </form>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-xl rounded-2xl">
            <table className="w-full text-sm text-left text-black">
              <thead className="text-xl text-gray-50 uppercase bg-gray-700 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((a) => (
                  <tr key={a.id} className="userspage border-b text-lg">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {a.id}
                    </th>
                    <td className="px-6 py-4 text-lg">{a.description}</td>
                    <td className="px-6 py-4 text-lg">
                      <button
                        className="bg-red-500 p-2 rounded-xl font-bold text-white"
                        onClick={() => {
                          handleAnnouncementDelete(a.id);
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
      </PageLayout>
    );
  } else {
    return <NotFound />;
  }
};
