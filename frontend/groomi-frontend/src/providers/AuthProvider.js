import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginScreenName } from "../screens/login/Login";
import { GroomingQueueScreenName } from "../screens/mainScreenClient/GroomingQueue";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate(GroomingQueueScreenName); // Redirect to the queue page after login
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate(LoginScreenName); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
