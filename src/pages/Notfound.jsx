import { Container, Stack, Typography } from "@mui/material"
import {Error as ErrorIcon} from "@mui/icons-material"
import { Link } from "react-router-dom"

const Notfound = () => {
  return (
  <Container maxWidth="lg" sx={{height: "100vh"}} >
<Stack 
alignItems={"center"}
justifyContent={"center"}
spacing={"2rem"}
height="100%"
>
  <ErrorIcon sx={{fontSize: "10rem"}}></ErrorIcon>
  <Typography variant="h1">404</Typography>
  <Typography variant="h3">Not Found</Typography>
  <Link to="/">Go Back To Home</Link>
</Stack>
  </Container>
  )
}

export default Notfound