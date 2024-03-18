import "./App.css";
import { Button } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hompage from "./Pages/Hompage";
import Chatpage from "./Pages/Chatpage";
import ChatProvider from "./Context/ChatProvider";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Hompage />}></Route>
        {/* <Route exact path="/home" element={<Home />}></Route> */}
        <Route exact path="/chat" element={<Chatpage />}></Route>
        <Route exact path="/chatp" element={<ChatProvider />}></Route>
      </Routes>
    </div>
  );
}

export default App;
