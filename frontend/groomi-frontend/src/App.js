import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen, { LoginScreenName } from "./screens/login/Login";
import RegisterScreen, { RegisterScreenName } from "./screens/register/Register";
import GroomingQueueScreen, { GroomingQueueScreenName } from "./screens/mainScreenClient/GroomingQueue";
import { AuthProvider } from "./providers/AuthProvider";
import { ErrorProvider } from "./providers/ErrorProvider";
import { SuccessProvider } from "./providers/SuccessProvider";

function App() {
  return (
    <SuccessProvider>
      <ErrorProvider>
        <AuthProvider>
          <Routes>
            <Route path={LoginScreenName} element={<LoginScreen />} />
            <Route path={RegisterScreenName} element={<RegisterScreen />} />
            <Route path={GroomingQueueScreenName} element={<GroomingQueueScreen />} />
            <Route path="*" element={<Navigate to={LoginScreenName} />} />
          </Routes>
        </AuthProvider>
      </ErrorProvider>
    </SuccessProvider>
  );
}

export default App;
