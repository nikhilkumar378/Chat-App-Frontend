/* eslint-disable no-unused-vars */
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import axios from "axios";
import React, { Suspense, lazy, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userNotExists } from "../../redux/reducers/auth";
import { resetNotificationCount } from "../../redux/reducers/chat";
import { setIsNewGroup,setIsMobile, setIsNotification, setIsSearch } from "../../redux/reducers/misc";
import { server } from "../constants/config";
// import Search from "../specific/Search"

const Search = lazy(() => import("../specific/Search"));
const Notifications = lazy(() => import("../specific/Notifications"));
const NewGroup = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isSearch, isNotification, isNewGroup} = useSelector((state)=> state.misc);

  const {notificationCount} = useSelector((state) => state.chat);
 



  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearchDialog = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };



  const logoutHandler = async () => {

    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {withCredentials: true});
      
      dispatch(userNotExists());
      toast.success(data.message);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
    console.log("logout");
  };




  const openNotification = () => {
    dispatch(setIsNotification(true))
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Chattu
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon></MenuIcon>
              </IconButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
              }}
            ></Box>

            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearchDialog}
              ></IconBtn>

              {/* <Tooltip title="Search">
              <IconButton color="inherit" size="large" onClick={openSearchDialog}>
              <SearchIcon></SearchIcon>
              </IconButton>

              </Tooltip> */}

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              ></IconBtn>

              <IconBtn
                title={"Manage Group"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              ></IconBtn>

              <IconBtn
                title={"Notifications"}
                icon={<NotificationIcon />}
                onClick={openNotification}
                value={notificationCount}
              ></IconBtn>

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              ></IconBtn>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop  open/>}>
          <Search />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop  open/>}>
          <Notifications />
        </Suspense>
      )}

      { isNewGroup && (
        <Suspense fallback={<Backdrop  open/>}>
          <NewGroup />
        </Suspense>
      )}
    </>
  );
};

// eslint-disable-next-line react/prop-types
const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>

       {value ? (<Badge badgeContent={value} color="error">{icon}</Badge>) : (icon)}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
