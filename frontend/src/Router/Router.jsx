import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/User/Login";
import Register from "../Components/User/Register";
import CreatEvent from "../Pages/CreatEvent";
import Home from "../Pages/Home";
import ProfilePage from "../Pages/ProfilePage";
import Myfeed from "../Pages/myFeed";
import UserUpdate from "../Pages/UserUpdate"

class Router extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myfeed" element={<Myfeed />} />
        <Route path="/createvent" element={<CreatEvent />} />
        <Route path="/myprofile" element={<ProfilePage />} />
        <Route path="/userupdate:id" element={<UserUpdate />} />
      </Routes>
    );
  }
}

export default Router;
