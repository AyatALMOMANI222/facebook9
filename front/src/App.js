import React, { useEffect, useState } from "react";
// import { useEffect } from "react";
import Register from "./component/Register";
import Login from "./component/Login";
import PublicPage from "./component/public page";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Navbar from "./component/navbar";
import Friend from "./component/friend";
import Setting from "./component/setting";
import Message from "./component/message";
import Mode from "./component/mode";
import Notification from "./component/notification";
import Profile from "./component/profile";
import { MdDarkMode } from "react-icons/md";
import User from "./component/user";
// import Post from "./component/Post";
// import Modal from "./component/model";
import AllFriends from "./component/AllFriends";
import FriendRequests from "./component/friendRequests";
import "./App.css";
import axios from "axios";
import Suggestions from "./component/suggestion";
import Search from "./component/search";
import SearchView from "./component/searchView";
import Messenger from "./component/messenger";
import OnePost from "./component/onePost";
import FriendProfile from "./component/friendProfile";
function App() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  // الحصول على التوكن و userId من localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const profile_picture = localStorage.getItem("profile_picture");
  // استخدام التوكن و userId بدون props
  console.log(token, userId);

  const handleLogout = () => {
    // مسح التوكن ومعرف المستخدم من localStorage عند تسجيل الخروج
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("profile_picture");

    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول بعد تسجيل الخروج
    navigate("/");
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Navbar profile_picture={profile_picture} token={token} userId={userId} />
      <hr />
      {/* <OnePost/> */}
      {/* <Profile token={token} userId={userId} username={username} /> */}
      {/* <PublicPage token={token} userId={userId}/>  */}
      <button onClick={handleLogout}>Logout</button>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        {/* <button onClick={toggleDarkMode}>
          <MdDarkMode size={30} />
        </button> */}
        {username}
      </div>
      <Routes>
        <Route
          path="/register"
          element={<Register token={token} userId={userId} />}
        ></Route>
        <Route
          path="/"
          element={<Login token={token} userId={userId} />}
        ></Route>
        <Route
          path="/friend"
          element={<Friend token={token} userId={userId} />}
        ></Route>
        <Route
          path="/profile"
          element={<Profile token={token} userId={userId} />}
        ></Route>
        <Route
          path="/publicPage"
          element={<PublicPage token={token} userId={userId} />}
        ></Route>
        <Route
          path="/navbar"
          element={<Navbar token={token} userId={userId} />}
        ></Route>
        <Route
          path="/notification"
          element={<Notification token={token} userId={userId} />}
        ></Route>
        <Route
          path="/user"
          element={<User token={token} userId={userId} />}
        ></Route>
        <Route
          path="/message"
          element={<Message token={token} userId={userId} />}
        ></Route>
        {/* <Route
          path="/mode"
          element={<Mode/>}
        ></Route> */}
        <Route
          path="/FriendRequests"
          element={<FriendRequests token={token} userId={userId} />}
        ></Route>
        <Route
          path="/Suggestions"
          element={<Suggestions token={token} userId={userId} />}
        ></Route>
        <Route
          path="/AllFriends"
          element={<AllFriends token={token} userId={userId} />}
        ></Route>
        <Route path="/search" element={<Search />} />
        <Route path="/search-view/:term" element={<SearchView />} />
        <Route
          path="/messenger/:user_id"
          element={
            <Messenger token={token} userId={userId} username={username} />
          }
        />
        <Route
          path="/post/one/:itemId"
          element={<OnePost token={token} userId={userId} />}
        />
        <Route
          path="/friendProfile/:userId"
          element={<FriendProfile token={token} />}
        />
      </Routes>
    </div>
  );
}

export default App;
