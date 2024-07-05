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
import { useState } from "react";
import { CameraAlt as CamerAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validator";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLogin, setIsLogin] = useState(true);

  const togglelogin = () => setIsLogin((prev) => !prev);
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler("single");
  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (

    <div style={{
      backgroundImage:
      "linear-gradient(rgba(200,200,200,0.5), rgba(120,110,220,0.5))"
    }}>
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
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={handleLogin}
            >
              <TextField
                required
                fullWidth
                label="username"
                margin="normal"
                varient="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />

              <TextField
                required
                fullWidth
                label="password"
                type="password"
                margin="normal"
                varient="outlined"
                value={password.value}
                onChange={password.changeHandler}
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

              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>

              <Button fullWidth variant="text" onClick={togglelogin}>
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={handleSignup}
            >
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                  src={avatar.preview}
                />

                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    color="error"
                    display={"block"}
                    varient="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    ":hover": {
                      bgcolor: "rgba(0,0,0,0.7)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CamerAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>

              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                varient="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />

              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                varient="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />

              <TextField
                required
                fullWidth
                label="username"
                margin="normal"
                varient="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />

              {username.error && (
                <Typography color="error" varient="caption">
                  {username.error}
                </Typography>
              )}

              <TextField
                required
                fullWidth
                label="password"
                type="password"
                margin="normal"
                varient="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />

              {password.error && (
                <Typography color="error" varient="caption">
                  {password.error}
                </Typography>
              )}

              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Sign Up
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>

              <Button fullWidth variant="text" onClick={togglelogin}>
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
    </div>
  );
};

export default Login;
