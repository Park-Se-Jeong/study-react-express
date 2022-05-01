import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .get(
        "http://parkcampus.parkh.xyz:8081/api/test?msg=hi"
      )
      .then((response) => console.log(response.data));
  }, []);
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={Auth(LandingPage, null)}></Route>
      <Route
        path='/login'
        element={Auth(LoginPage, false)}></Route>
      <Route
        path='/register'
        element={Auth(RegisterPage, false)}></Route>
    </Routes>
  );
}

export default App;
