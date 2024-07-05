/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";


import { bgGradient1 } from "../../components/constants/color";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";

const isAdmin  = true;

const AdminLogin = () => {
  const secretkey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

if(isAdmin) return <Navigate to="/admin/dashboard"/>

  return (
    <div
      style={{
        backgroundImage: bgGradient1,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="secretkey"
              type="password"
              margin="normal"
              varient="outlined"
              value={secretkey.value}
              onChange={secretkey.changeHandler}
            />

            <Button
              sx={{
                marginTop: "1rem",
              }}
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
