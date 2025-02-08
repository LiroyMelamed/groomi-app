import React, { createContext, useContext, useState } from "react";
import SimplePopup from "../components/simpleComponents/SimplePopup";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
    const [error, setError] = useState(null);

    const showError = (message) => {
        setError(message);
    };

    const hideError = () => {
        setError(null);
    };

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            <SimplePopup isOpen={!!error} onClose={hideError}>
                <h3>Error</h3>
                <p>{error}</p>
            </SimplePopup>
        </ErrorContext.Provider>
    );
}

export function useError() {
    return useContext(ErrorContext);
}
