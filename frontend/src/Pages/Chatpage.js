import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellanoues/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import Footer from "./Footer";
const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default Chatpage;
