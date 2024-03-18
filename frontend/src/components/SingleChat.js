import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import {
  Box,
  IconButton,
  Text,
  Spinner,
  FormControl,
  Input,
  useToast,
  Tooltip,
  Avatar,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import {
  getSender,
  getSenderFull,
  isLastMessage,
  isSameSender,
} from "../Config/ChatLogics";
import ProfileModel from "./miscellanoues/ProfileModel";
import UpdateGroupChatModel from "./miscellanoues/UpdateGroupChatModel";
import axios from "axios";
import "./style.css";
import ScollableChat from "./ScollableChat";
import animationData from "../animations/typing.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const io = require("socket.io-client");
const ENDPOINT = "http://127.0.0.1:5000/";
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setsocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toast = useToast();
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      // console.log(selectedChat._id);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "failed to send meassage",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setsocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => {
      setIsTyping(false);
      // socket.in(room).emit("stopTyping");
    });
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  console.log(notification, "----------------------------");
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stopTyping", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setMessages([...messages, data]);
        socket.emit("newMessage", data);
      } catch (error) {
        toast({
          title: "Error Occured",
          description: "failed to send meassage",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime;
    var timelength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime;
      var timeDiff = timeNow - lastTypingTime;
      if (!timeDiff >= timelength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timelength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            color="white"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="black"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? (
                <Lottie
                  options={defaultOptions}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                  height={13}
                />
              ) : (
                <></>
              )}

              <Input
                variant="filled"
                bg="E0E0E0"
                color="white"
                marginBottom="0px"
                placeholder="Enter a message"
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text color="white" fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start Chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
