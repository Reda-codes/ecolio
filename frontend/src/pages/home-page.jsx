import React from "react";
import { LoginButton } from "../components/buttons/login-button";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

export function HomePage() {
  const { isAuthenticated, logout } = useAuth0();
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div className="flex flex-col homapage justify-between">
      <div className="flex flex-col justify-center h-screen">
        <div className="bg-white m-8 rounded-3xl w-500 mx-auto shadow-2xl">
          <img
            className="p-5"
            src="/logo-no-background.png"
            alt="Auth0 shield logo"
            width="500"
            height="100"
          />
        </div>
        {isAuthenticated ? (
          <button className="w-1/6  bg-blue-500 hover:bg-green-700 text-white font-bold p-4 rounded-3xl text-4xl mx-auto">
            <NavLink to={"/dashboard"} end>
              Dashboard
            </NavLink>
          </button>
        ) : (
          <LoginButton />
        )}
        {isAuthenticated ? (
          <button
            className="w-1/6  bg-red-500 hover:bg-red-700 text-white font-bold p-4 rounded-3xl text-4xl mx-auto mt-5"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          ""
        )}
        <div className="m-8 mx-auto mt-72 bg-white p-4 rounded-3xl bg-opacity-40 animate-bounce">
          <img
            className=" mx-auto"
            src="/icons8-scroll-64.png"
            alt="Auth0 shield logo"
            width="80"
            height="80"
          />
          <h1 className="text-3xl font-bold font-mono text-center ">
            SCROLL DOWN
          </h1>
        </div>
      </div>
      <div className="flex justify-between bg-white w-10/12 mb-5 mx-auto p-8 rounded-3xl bg-opacity-50">
        <div className="w-1/4 userspage rounded-3xl p-10 drop-shadow-xl">
          <h1 className="text-3xl font-bold font-mono text-center mb-5">
            Multiple user types
          </h1>
          <div className="m-8 mx-auto w-auto h-auto">
            <img
              className="rounded-3xl"
              src="/UsersTypes.png"
              alt="Auth0 shield logo"
              width="450"
              height="450"
            />
          </div>
          <p className="text-xl font-mono">
            Thanks to Auth0, we were able to implement a feature that allows
            different user types to log in from the same portal and access
            different dashboards. Auth0 provides a secure and scalable identity
            management platform that enables us to easily authenticate and
            authorize users based on their roles or permissions. This means that
            users can log in with different credentials and get access to
            features or data that are specific to their role or permissions. For
            example, a teacher can log in and see a dashboard with student lists
            and grades, while an administrator can log in and access a dashboard
            with more administrative features like user management and
            reporting. This feature allows us to provide a personalized user
            experience that is tailored to the specific needs of each user type,
            improving the overall usability and efficiency of our platform.
          </p>
        </div>
        <div className="w-1/4 serspage">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ad
            alias odit facere soluta obcaecati autem omnis, modi quas,
            voluptates exercitationem nisi iste. Dolore impedit harum officia
            dolorum corporis in.
          </p>
        </div>
        <div className="w-1/4 serspage">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ad
            alias odit facere soluta obcaecati autem omnis, modi quas,
            voluptates exercitationem nisi iste. Dolore impedit harum officia
            dolorum corporis in.
          </p>
        </div>
      </div>
      <div className="justify-between bg-white w-10/12 mb-5 mx-auto p-8 rounded-3xl bg-opacity-50">
        <h1> About </h1>
        <div className="w-1/4 userspage rounded-3xl p-10 drop-shadow-xl">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            ducimus, recusandae in adipisci tenetur eius illum similique,
            inventore doloremque placeat laudantium corrupti ratione velit culpa
            architecto quis quisquam nihil laborum. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Mollitia possimus neque ducimus id
            sunt porro expedita, et aliquid eius asperiores, obcaecati est ex ad
            architecto! Consectetur modi exercitationem aliquid praesentium?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas nam
            optio ducimus labore a cumque sint sunt quos inventore laborum
            delectus numquam praesentium eaque sequi, magnam ad accusantium.
            Cum, ut.
          </p>
        </div>
      </div>
      <footer className="flex justify-center w-full bg-slate-900 font-medium text-3xl leading-10">
        <p className="text-white">This Platform is powered by ecolio CMS</p>
      </footer>
    </div>
  );
}
