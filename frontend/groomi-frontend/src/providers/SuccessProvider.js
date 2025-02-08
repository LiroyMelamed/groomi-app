import React, { createContext, useContext, useState } from "react";
import SimplePopup from "../components/simpleComponents/SimplePopup";

const SuccessContext = createContext();

export function SuccessProvider({ children }) {
    const [success, setSuccess] = useState(null);

    const showSuccess = (message) => {
        setSuccess(message);
    };

    const hideSuccess = () => {
        setSuccess(null);
    };

    return (
        <SuccessContext.Provider value={{ showSuccess }}>
            {children}
            <SimplePopup isOpen={!!success} onClose={hideSuccess}>
                <p>{success}</p>
            </SimplePopup>
        </SuccessContext.Provider>
    );
}

export function useSuccess() {
    return useContext(SuccessContext);
}
