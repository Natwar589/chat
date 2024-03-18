import React from "react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const Hompage = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  //   // if (!userInfo) {
  //   //   navigate("/");
  //   // }
  // }, [navigate]);
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        backgroundColor="#059895"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="50px"
        borderWidth="1px"
      >
        <Text color="whitesmoke" fontSize="2xl" fontFamily="fantasy">
          ChatMe
        </Text>
      </Box>
      <Box
        bg="black"
        color="whitesmoke"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Hompage;
