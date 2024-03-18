import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";

const Logout = ({ user }) => {
  const naviagte = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    naviagte("/");
  };
  return (
    <Menu>
      <MenuButton bg="#c2bf03" as={Button} rightIcon={<ChevronDownIcon />}>
        <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
      </MenuButton>
      <MenuList>
        <ProfileModel user={user}>
          <MenuItem>My Profile</MenuItem>
        </ProfileModel>

        <MenuDivider />
        <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Logout;
