import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen, { LoginScreenName } from "./screens/login/Login";
import RegisterScreen, { RegisterScreenName } from "./screens/register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={LoginScreenName} element={<LoginScreen />} />
        <Route path={RegisterScreenName} element={<RegisterScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
