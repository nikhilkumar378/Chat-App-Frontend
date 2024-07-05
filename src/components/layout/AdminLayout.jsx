/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { grayColor, matblack } from "../constants/color";
import { Menu as MenuIcon, ManageAccounts as ManageAccountsIcon, Groups as GroupsIcon, Message as MessageIcon, ExitToApp as ExitToAppIcon} from "@mui/icons-material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { Dashboard as DashboardIcon } from "@mui/icons-material";

const Link = styled(LinkComponent)`
text-decoration: none;
border-radius: 2rem;
padding: 1rem 2rem;
color: black;
&:hover{
  color: rgba(0,0,0,0.54)
}

`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon/>,
  },

  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon/>,
  },

  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon/>,
  }
  ,
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon/>,
  }
];



const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const logOutHandler = ()=>{
    console.log("logout")
  }

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Admin
      </Typography>

      <Stack spacing={"1rem"} >
        {adminTabs.map((i) => (
          <Link key={i.path} to={i.path} sx={ location.pathname === i.path && {
            bgcolor: matblack,
            color: "white",
            ":hover":{
              color: "white"
            }
          }}  >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {i.icon}

              <Typography>{i.name}</Typography>
            </Stack>
          </Link>
        ))}



<Link  onClick={logOutHandler}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {<ExitToAppIcon/>}

              <Typography>Log Out</Typography>
            </Stack>
          </Link>
       
      </Stack>
    </Stack>
  );
};



const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobile, setMobile] = useState(false);
  const handleMobile = () => setMobile(!isMobile);
  const handleClose = () => setMobile(false);

  if(!isAdmin) return <Navigate  to="/admin" />
  return (
    <>
      <Box
        sx={{
          display: { xs: " block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>


      
      <Grid container minHeight={"100vh"}>
        <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar />
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          sx={{ display: { xs: "block", md: "block" } }}
          bgcolor={grayColor}
        >
          {children}
        </Grid>
        <Drawer open={isMobile} onClose={handleClose}>
          <Sidebar w="50vw"></Sidebar>
        </Drawer>
      </Grid>
    </>
  );
};

export default AdminLayout;
