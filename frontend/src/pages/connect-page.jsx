import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { PageLayout } from "../components/page-layout";

export const ConnectPage = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();

      if (!isMounted) {
        return;
      }

      if (accessToken) {
        return;
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, user]);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Connect Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page sends a message to the api and retrives extra data.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};
