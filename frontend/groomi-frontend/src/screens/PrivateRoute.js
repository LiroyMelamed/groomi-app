import React from "react";
import { Navigate } from "react-router-dom";
import { LoginScreenName } from "./login/Login";
import { useAuth } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to={LoginScreenName} />;
};

export default PrivateRoute;
