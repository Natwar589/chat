import {
  FormControl,
  Input,
  VStack,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [loading, setloading] = useState(false);
  const { setUser } = ChatState();
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const handleClick = () => {
    setshow(!show);
  };
  const submitHandler = async () => {
    console.log("helo");
    setloading(true);
    console.log(email + password);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      // navigate("/chat");
      navigate("/home");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };

  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="50%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>{" "}
      <Button
        variant={"solid"}
        colorScheme="red"
        width="50%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest123@gmail.com");
          setPassword("123456");
          navigate("/chat");
        }}
      >
        Get Guest User Credntials
      </Button>
    </VStack>
  );
};

export default Login;
