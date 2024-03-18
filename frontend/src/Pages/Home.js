import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Images from "./Images";
import Logout from "../components/miscellanoues/Logout";
import { ChatState } from "../Context/ChatProvider";
import { background } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="head">
      {/* <div className="sidebar">
        <div className="logo">CHAT APP</div>
        <button className="btn" onClick={() => navigate("/home")}>
          Home
        </button>
        <button className="btn" onClick={() => navigate("/chat")}>
          Message
        </button>
        <button className="btn">about</button>
      </div>
      <div className="header">
        <h1 className="iist">Indore institute science and Technology</h1>
      </div> */}
      {/* <nav className="navbar">
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
      </nav> */}
      <NavBar />
      <h1 className="achive">Achievements of Seniors</h1>
      <Images />
      <Footer />
    </div>
  );
};

export default Home;
