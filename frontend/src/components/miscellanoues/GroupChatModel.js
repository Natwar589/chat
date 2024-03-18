import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useTab,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const GroupChatModel = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
      console.log(data + "");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleSubmit = async () => {
    if (!groupName || !selectedUsers) {
      toast({
        title: "Please Fill All the fileds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setLoading(false);
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group is Created",
        status: "Success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error in Group Creation",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "user already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="felx"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" flexDir="column">
            <FormControl>
              <Input
                placeholder="GroupName"
                mb={3}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add users eg:jhon jhen doe"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {/* {console.log(selectedUsers)} */}
              <Box w="100%" display="flex" flexWrap="wrap">
                {selectedUsers
                  ? selectedUsers.map((u) => (
                      <UserBadgeItem
                        key={user._id}
                        user={u}
                        handleFunction={() => handleDelete(u)}
                      />
                    ))
                  : []}
              </Box>

              {loading ? (
                <Spinner />
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModel;
