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
      <div className="w-1/2 mx-auto rounded-2xl mt-5 p-4  shadowInner">
        <ul className="flex justify-around text-3xl text-black font-mono font-extrabold">
          <li className="hover:text-indigo-500">
            <a href="#features">FEATURES</a>
          </li>
          <li className="hover:text-indigo-500">
            <a href="#about">ABOUT</a>
          </li>
          <li className="hover:text-indigo-500">
            <a href="#video">VIDEO</a>
          </li>
          <li className="hover:text-indigo-500">
            <a href="#app">DEMO</a>
          </li>
        </ul>
      </div>
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
        <p className="text-center font-bold font-mono text-white text-4xl">
          A Platform For Every School
        </p>
        <div className="m-8 mx-auto mt-72 bg-white p-4 rounded-3xl bg-opacity-20 animate-bounce">
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
      <div className=" bg-white mx-auto p-5 rounded-full bg-opacity-20 w-3/4 mb-16">
        <h1
          className="text-center mb-5 text-5xl font-bold font-mono"
          id="features"
        >
          FEATURES
        </h1>
        <div className="flex justify-between">
          <div className="w-1/3 mx-5 userspage rounded-3xl p-10 drop-shadow-xl">
            <h1 className="text-4xl font-bold font-mono text-center mb-5">
              Multiple Users Types
            </h1>
            <div className="m-8 mx-auto w-auto h-auto">
              <img
                className="rounded-3xl mx-auto"
                src="/UsersTypes.png"
                alt="Auth0 shield logo"
                width="400"
                height="400"
              />
            </div>
            <p className="text-2xl font-mono">
              Thanks to Auth0, we were able to implement a feature that allows
              different user types to log in from the same portal and access
              different dashboards. Auth0 provides a secure and scalable
              identity management platform that enables us to easily
              authenticate and authorize users based on their roles or
              permissions. This means that users can log in with different
              credentials and get access to features or data that are specific
              to their role or permissions. For example, a teacher can log in
              and see a dashboard with student lists and grades, while an
              administrator can log in and access a dashboard with more
              administrative features like user management and reporting. This
              feature allows us to provide a personalized user experience that
              is tailored to the specific needs of each user type, improving the
              overall usability and efficiency of our platform.
            </p>
          </div>
          <div className="w-2/3 mx-5 rounded-3xl p-10 pt-0 drop-shadow-xl ">
            <div className="m-8 mt-0 mx-auto w-auto h-auto">
              <img
                className="rounded-3xl "
                src="/student-dashboard.png"
                alt="Auth0 shield logo"
                width="1333"
                height="345"
              />
            </div>
            <div className="flex mb-8">
              <div className="p-5 userspage rounded-l-2xl">
                <h1 className="text-4xl font-bold font-mono text-center mb-5">
                  Public Announcements
                </h1>
                <p className="text-xl font-mono">
                  Ecolio&apos;s public announcements feature allows school staff
                  to share important information, updates, and announcements
                  with all students and instructors in one place. With this
                  feature, staff members can easily create public announcements
                  about school events, instructions, or even a simple happy
                  birthday message to someone, and share them with the entire
                  school community. This feature helps to keep everyone informed
                  and engaged, creating a sense of community and school spirit.
                  Students and instructors can view public announcements on
                  their dashboard and stay up-to-date on the latest school news
                  and events. The public announcement feature is an excellent
                  tool for school staff who want to keep everyone informed and
                  connected, ensuring that everyone is on the same page and
                  working towards a common goal.
                </p>
              </div>
              <div className="p-5 userspage rounded-r-2xl">
                <h1 className="text-4xl font-bold font-mono text-center mb-5">
                  Students Private Notes
                </h1>
                <p className="text-xl font-mono">
                  Ecolio&apos;s private notes feature allows instructors to
                  share individualized feedback and comments with each student,
                  ensuring that they receive personalized support and guidance.
                  With this feature, instructors can create private notes for
                  each student, providing them with specific feedback on their
                  academic progress and identifying areas where they may need
                  additional support. Instructors can also use private notes to
                  recognize their students&apos; achievements, encourage them to
                  continue working hard, and help them develop the skills they
                  need to succeed. By enabling instructors to share private
                  notes with each student, Ecolio helps to foster a supportive
                  learning environment that encourages students to reach their
                  full potential. The private notes feature is a valuable tool
                  for instructors who want to make a positive impact on their
                  students&apos; academic success and personal growth.
                </p>
              </div>
            </div>
            <div className="rounded-3xl p-5 drop-shadow-xl bg-white flex">
              <div className=" mx-auto w-auto h-auto">
                <img
                  className="rounded-3xl "
                  src="/classes.png"
                  alt="Auth0 shield logo"
                  width="396"
                  height="499"
                />
              </div>
              <div className="p-5 userspage rounded-2xl ml-5 w-2/3">
                <h1 className="text-4xl font-bold font-mono text-center mb-5">
                  Homework Tracking
                </h1>
                <p className="text-xl font-mono">
                  Ecolio&apos;s homework tracking feature allows instructors to
                  keep a record of the homework assigned to students, enabling
                  them to monitor their progress and ensure that they are
                  meeting their academic goals. With this feature, instructors
                  can easily assign different homework to multiple classes. In
                  the future, this feature will evolve to allow instructors to
                  set due dates and track the completion status of each task.
                  Students can view their assignments, complete them, and mark
                  them as done, providing them with a sense of accomplishment
                  and ownership of their education. Instructors will also be
                  able to add individual notes with each student&apos;s
                  assignment, providing personalized feedback and ensuring that
                  students receive the support they need to succeed. The
                  homework tracking feature is an essential tool for instructors
                  and students alike, helping to promote accountability and
                  academic achievement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-between bg-white w-3/4  mx-auto p-8  mb-16 rounded-3xl bg-opacity-20">
        <h1
          className="text-center mb-5 text-5xl font-bold font-mono"
          id="about"
        >
          About Ecolio
        </h1>
        <div className="w-full rounded-3xl p-10 drop-shadow-xl">
          <div className="m-8 mt-0 mx-auto w-auto h-auto">
            <img
              className="rounded-3xl mx-auto"
              src="/dashboard.png"
              alt="Auth0 shield logo"
              width="1905"
              height="982"
            />
          </div>
          <div className="">
            <p className="text-2xl font-mono p-8 rounded-xl userspage mb-8">
              Ecolio is an innovative school CMS MVP designed to help schools
              manage their students, instructors, and staff members. Developed
              with a great passion, Ecolio empowers schools to create and manage
              user accounts, including instructors and students, and create
              classes for them that they participate in. The idea came up to me
              when I was randomly searching for different CMSs and found out
              that for schools there isn&apos;t that much solutions addressed to
              this issue so for my
              <a
                target="_blank"
                href="https://www.holbertonschool.com/"
                className="text-red-500 font-bold tect-3xl"
                rel="noreferrer"
              >
                &nbsp;Holberton School&nbsp;
              </a>
              Portfolio Project I decided to create Ecolio A platform for every
              school. The MVP offers features such as announcement sharing,
              homework assignments, and individual notes for students, allowing
              instructors to keep track of their students&apos; progress. The
              Ecolio team plans to add more features in the future, including
              class attendance management, file sharing, in-app messaging, a
              school calendar, and administration contact. Parent accounts will
              also be included, enabling parents to stay updated on their
              child&apos;s academic progress. With Ecolio, schools can
              streamline their administrative tasks and focus on providing the
              best possible education for their students. Ecolio is an essential
              tool for schools of all sizes and is sure to make a significant
              impact on the education industry.
            </p>
            <div className=" userspage rounded-xl mr-8 flex w-full">
              <div className="w-1/3">
                <div className="m-8 mt-0 mx-auto w-auto h-auto">
                  <img
                    className="rounded-full mx-auto"
                    src="/avatar.webp"
                    alt="Auth0 shield logo"
                    width="300"
                    height="300"
                  />
                </div>
              </div>
              <div className="w-1/3">
                <h1 className="text-center m-5 text-5xl font-bold font-mono">
                  About Me
                </h1>
                <p className="text-2xl font-mono p-8 ">
                  Some people know me as Mohamed, others prefer to call me Reda.
                  But, as far as I remember the only person who calls me Mohamed
                  Reda is my Mom. I am a Self-Taught somehow near software
                  developer who loves to code, learn & write about it. Currently
                  pursuing my dream with the help of ALX Africa and Holberton
                  School. I also lost about 50kg in the past two years and that
                  is what motivated me to change my career from working with
                  hardware to now working on building software.
                </p>
              </div>
              <div className="w-1/3">
                <h1 className="text-center m-5 text-5xl font-bold font-mono">
                  Links
                </h1>
                <ul>
                  <li className="m-3">
                    <a
                      href="https://www.linkedin.com/in/reda-med/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-left"
                    >
                      <img
                        className=""
                        src="/linkedin_black_logo_icon_147114.png"
                        alt="linkedin logo"
                        width="50"
                        height="50"
                      />
                      <span className="align-middle text-3xl ml-5 leading-loose font-bold">
                        LinkedIn
                      </span>
                    </a>
                  </li>
                  <li className="m-3">
                    <a
                      href="https://twitter.com/RedaCodes"
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-left"
                    >
                      <img
                        className=""
                        src="/twitter_black_logo_icon_147062.png"
                        alt="Twitter logo"
                        width="50"
                        height="50"
                      />
                      <span className="align-middle text-3xl ml-5 leading-loose font-bold">
                        Twitter
                      </span>
                    </a>
                  </li>
                  <li className="m-3">
                    <a
                      href="https://reda.codes"
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-left"
                    >
                      <img
                        className=""
                        src="/user_interface_worldwide_globe_web_ui_website_icon_221205.png"
                        alt="Globe logo"
                        width="50"
                        height="50"
                      />
                      <span className="align-middle text-3xl ml-5 leading-loose font-bold">
                        Reda.Codes
                      </span>
                    </a>
                  </li>
                  <li className="m-3">
                    <a
                      href="https://github.com/Reda-codes/ecolio"
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-left"
                    >
                      <img
                        className=""
                        src="/github_111098.png"
                        alt="Github logo"
                        width="50"
                        height="50"
                      />
                      <span className="align-middle text-3xl ml-5 leading-loose font-bold">
                        Project Repository
                      </span>
                    </a>
                  </li>
                  <li className="m-3">
                    <a
                      href="mailto:hello@reda.codes"
                      rel="noreferrer"
                      className="flex justify-left"
                    >
                      <img
                        className=""
                        src="/newemailoutlinesymbolinblackcircularbutton_104753.png"
                        alt="Email logo"
                        width="50"
                        height="50"
                      />
                      <span className="align-middle text-3xl ml-5 leading-loose font-bold">
                        Hello@Reda.Codes
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-between bg-white w-3/4 mx-auto p-8 mb-16 rounded-3xl bg-opacity-20">
        <h1
          className="text-center mb-5 text-5xl font-bold font-mono"
          id="video"
        >
          Video
        </h1>
        <div className="w-full rounded-3xl p-10 drop-shadow-xl">
          <div className="w-full">
            <iframe
              className="w-full rounded-3xl"
              width="1920"
              height="700"
              src="https://www.youtube.com/embed/6NNANhpBND4"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
      </div>
      <div className=" bg-white w-3/4 mb-16 mx-auto p-8 rounded-3xl bg-opacity-20">
        <div className=" flex">
          <div className="bg-white rounded-2xl p-5 m-10 text-2xl font-mono w-2/3">
            <h1
              className="text-center mb-5 text-5xl font-bold font-mono"
              id="app"
            >
              Demo
            </h1>
            <p>
              Thank you for taking the time to explore our school CMS web app.
              <br /> We appreciate your interest in our Demo and hope that you
              found the information on this page helpful. Please note that in
              order to access a demo account, you will need to contact us
              directly at hello@reda.codes.
              <br />
              Due to the nature of our app and the way it is used, we require a
              more personalized approach to account creation. We&apos;re happy
              to provide you with a demo account and answer any questions you
              may have about our product. Thank you again for your interest in
              our app.
            </p>
          </div>
          <div className="1/3 ">
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
              <button className="w-full  bg-blue-500 hover:bg-green-700 text-white font-bold p-4 rounded-3xl text-4xl mx-auto">
                <NavLink to={"/dashboard"} end>
                  Dashboard
                </NavLink>
              </button>
            ) : (
              <LoginButton />
            )}
            {isAuthenticated ? (
              <button
                className="w-full  bg-red-500 hover:bg-red-700 text-white font-bold p-4 rounded-3xl text-4xl mx-auto mt-5"
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <footer className="flex justify-center w-full bg-slate-900 font-medium text-3xl leading-10">
        <p className="text-white">This Platform is powered by ecolio CMS</p>
      </footer>
    </div>
  );
}
