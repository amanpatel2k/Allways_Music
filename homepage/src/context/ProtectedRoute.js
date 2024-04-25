/* 
  => This program is utilize to establish only user's that are sign in into our application
  => User that signed out can't navigate back into the application through the URL
*/

import React from "react";
import { Navigate } from "react-router-dom";
import {useUserAuth} from "./AuthContext";

const ProtectedRoute = ({ children }) => {

  // Grab the current user from the firebase authentication
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  /*
  => If the user is not login into our application, then the user get directed to the sign in page
  */
  if (!user) {
    return <Navigate to="/"/>;
  }
  return children;
};

export default ProtectedRoute;