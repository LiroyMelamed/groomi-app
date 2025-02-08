import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen, { LoginScreenName } from "./screens/login/Login";
import RegisterScreen, { RegisterScreenName } from "./screens/register/Register";
import GroomingQueueScreen, { GroomingQueueScreenName } from "./screens/mainScreenClient/GroomingQueue";
import { AuthProvider } from "./providers/AuthProvider";
import { ErrorProvider } from "./providers/ErrorProvider";

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <Routes>
          <Route path={LoginScreenName} element={<LoginScreen />} />
          <Route path={RegisterScreenName} element={<RegisterScreen />} />
          {/* <PrivateRoute> */}
          <Route path={GroomingQueueScreenName} element={<GroomingQueueScreen />} />
          {/* </PrivateRoute> */}
        </Routes>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
