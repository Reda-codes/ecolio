import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { SideBar } from "../components/navigation/desktop/side-bar";
import { SideBarTab } from "../components/navigation/desktop/side-bar-tab";

export const ProfilePage = () => {
  const [metadata, setMetadata] = useState("");

  const { user, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMetadata = async () => {
      let claims = await getIdTokenClaims();

      if (!isMounted) {
        return;
      }

      if (claims) {
        setMetadata(JSON.stringify(claims, null, 2));
      }
    };

    getMetadata();
    return () => {
      isMounted = false;
    };
  }, [getIdTokenClaims, metadata]);

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <SideBar>
          <div className="mx-auto pb-4">
            <SideBarTab path="/dashboard" label="Dashboard" />
          </div>
          <div className="mx-auto pb-4">
            <SideBarTab path="/profile" label="Profile" />
          </div>
        </SideBar>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile
              information of an authenticated user.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
              <CodeSnippet title="Decoded ID Token" code={metadata} />
              <CodeSnippet
                title="Decoded ID Token"
                code={JSON.stringify(user, null, 2)}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
