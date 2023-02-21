import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageLayout } from "../components/page-layout";
import { SideBar } from "../components/navigation/desktop/side-bar";
import { SideBarTab } from "../components/navigation/desktop/side-bar-tab";

export const UsersPage = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();

      if (!isMounted) {
        return;
      }

      if (accessToken) {
        setMessage(JSON.stringify(accessToken, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  const handleSubmit = (event) => {
    event.preventDefault();

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
          Authorization: message,
        }
      )
      .then((response) => {
        console.log(response.data);
        // handle success
      })
      .catch((error) => {
        console.log(error.response.data);
        // handle error
      });
  };

  if (user["user_type"] === "admin") {
    return (
      <PageLayout>
        <SideBar>
          <div className="mx-auto pb-4">
            <SideBarTab path="/dashboard" label="Dashboard" />
          </div>
          <div className="mx-auto pb-4">
            <SideBarTab path="/profile" label="Profile" />
          </div>
          <div className="mx-auto pb-4">
            <SideBarTab path="/users" label="Users" />
          </div>
          <div className="mx-auto pb-4">
            <SideBarTab path="/classes" label="Classes" />
          </div>
        </SideBar>
        <div className="">
          <div className="text-black p-5 userspage rounded-2xl drop-shadow-xl">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </div>
              <div>
                <label>User Type:</label>
                <input
                  type="text"
                  value={userType}
                  onChange={(event) => setUserType(event.target.value)}
                  required
                />
              </div>
              <button type="submit">Create User</button>
            </form>
          </div>
        </div>
      </PageLayout>
    );
  } else {
    return (
      <PageLayout>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Not Authorized
          </h1>
        </div>
      </PageLayout>
    );
  }
};
