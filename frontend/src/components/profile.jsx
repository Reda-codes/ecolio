import { React } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function Profile() {
  const { user } = useAuth0();
  return (
    <div className="text-black">
      <div className="w-1/2 mx-auto mt-8 userspage rounded-2xl drop-shadow-2xl p-8">
        <img
          src={user.picture}
          alt="Profile"
          className="rounded-full border-4 border-black mb-5"
        />
        <div className="flex m-5 bg-slate-600 p-2 text-white rounded-xl">
          <h1 className="text-3xl font-bold">User ID:</h1>
          <h1 className="text-2xl font-bold leading-relaxed pl-5">
            {user.sub}
          </h1>
        </div>
        <div className="flex m-5 bg-slate-600 p-2 text-white rounded-xl">
          <h1 className="text-3xl font-bold">Last Name:</h1>
          <h1 className="text-2xl font-bold leading-relaxed pl-5">
            {user.family_name}
          </h1>
        </div>
        <div className="flex m-5 bg-slate-600 p-2 text-white rounded-xl">
          <h1 className="text-3xl font-bold">First Name:</h1>
          <h1 className="text-2xl font-bold leading-relaxed pl-5">
            {user.given_name}
          </h1>
        </div>
        <div className="flex m-5 bg-slate-600 p-2 text-white rounded-xl">
          <h1 className="text-3xl font-bold">User Email:</h1>
          <h1 className="text-2xl font-bold leading-relaxed pl-5">
            {user.email}
          </h1>
        </div>
        <div className="flex m-5 bg-slate-600 p-2 text-white rounded-xl">
          <h1 className="text-3xl font-bold">Email Status:</h1>
          <h1 className="text-2xl font-bold leading-relaxed pl-5">
            {user.email_verified ? "Verified" : "Not Verified"}
          </h1>
        </div>
        <div className="flex m-5 bg-slate-600 p-2 text-white rounded-xl">
          <h1 className="text-3xl font-bold">User Type:</h1>
          <h1 className="text-2xl font-bold leading-relaxed pl-5">
            {user.user_type === "students" ? "Student" : "Instructor"}
          </h1>
        </div>
        <div className="flex m-5 justify-around mt-20">
          <button
            disabled="disabled"
            className="text-white text-2xl bg-red-200 p-5 rounded-xl font-bold"
          >
            Password Reset
          </button>
          <button
            disabled="disabled"
            className="text-white text-2xl bg-red-200 p-5 rounded-xl font-bold"
          >
            Send Verification
          </button>
        </div>
      </div>
    </div>
  );
}
