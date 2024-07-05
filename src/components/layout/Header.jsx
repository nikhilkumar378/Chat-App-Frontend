/* eslint-disable no-unused-vars */
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { Suspense, lazy, useState } from "react";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import Search from "../specific/Search"

const Search = lazy(() => import("../specific/Search"));
const Notifications = lazy(() => import("../specific/Notifications"));
const NewGroup = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };

  const logoutHandler = () => {
    console.log("logout");
  };

  const openNotification = () => {
    setIsNotification((prev) => !prev);
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

      {isNewGroup && (
        <Suspense fallback={<Backdrop  open/>}>
          <NewGroup />
        </Suspense>
      )}
    </>
  );
};

// eslint-disable-next-line react/prop-types
const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
