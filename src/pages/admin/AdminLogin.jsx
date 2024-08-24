/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";

import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { bgGradient1 } from "../../components/constants/color";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const secretkey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Secret Key Submitted:", secretkey.value);  // Log the value
    dispatch(adminLogin(secretkey.value));
  };

  useEffect(()=>{
  dispatch(getAdmin());
  },[dispatch])
  

  if (isAdmin) return <Navigate to="/admin/dashboard" />;
 
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
