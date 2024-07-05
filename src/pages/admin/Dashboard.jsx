/* eslint-disable react/prop-types */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { DoughnutChart, LineChart } from "../../components/specific/Chart";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={5}
      sx={{ Padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        padding={"1rem"}
      >
        <AdminPanelSettingsIcon
          sx={{ fontSize: "3rem" }}
        ></AdminPanelSettingsIcon>
        <SearchField placeholder="search..."></SearchField>
        <CurveButton>Search</CurveButton>

        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <NotificationIcon></NotificationIcon>
      </Stack>
    </Paper>
  );

  const widget = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      margin={"2rem 0"}
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={"2rem"}
    >
      <Noise title={"Users"} value={34} icon={<PersonIcon />} />
      <Noise title={"Message"} value={76} icon={<GroupIcon />} />
      <Noise title={"Chats"} value={678} icon={<MessageIcon />} />
    </Stack>
  );
  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}

        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={"2rem"}
          justifyContent={"center"}
          alignItems={{ xs: "center", lg: "stretch" }}
          sx={{ gap: "2rem" }}
         
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
            }}
          >
            <Typography variant="h4" margin={"2rem 0"}>
              {" "}
              Last Message
            </Typography>

            <LineChart value={[99, 55, 47, 87, 0, 1]} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: " flex",
              position: "relative",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              justifyContent: "center",
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart />

            <Stack
              position={"absolute"}
              direction={"row"}
              spacing="0.5rem"
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon /> <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {widget}
      </Container>
    </AdminLayout>
  );
};

const Noise = ({ title, value, icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      width: "20rem",
      borderRadius: "1.5rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width="5rem"
        height="5rem"
        color="rgba(0,0,0,0.7)"
        borderRadius="50%"
        border="5px solid rgba(0,0,0,0.9)"
      >
        {value}
      </Typography>
    </Stack>

    <Stack
      display={"flex"}
      justifyContent={"center"}
      spacing={"1rem"}
      direction={"row"}
      alignItems={"center"}
    >
      {icon}
      <Typography>{title}</Typography>
    </Stack>
  </Paper>
);

export default Dashboard;
