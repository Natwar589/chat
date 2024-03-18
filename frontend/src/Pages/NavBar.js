import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logout from "../components/miscellanoues/Logout";
import { ChatState } from "../Context/ChatProvider";

const NavBar = () => {
//   const navigate = useNavigate();
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Chat App</div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/chat">Community</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>
        <Logout user={user} />
      </div>
    </nav>
  );
};

export default NavBar;
