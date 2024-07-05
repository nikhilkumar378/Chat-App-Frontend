/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material"
import  AppLayout  from "../components/layout/AppLayout.jsx"
import { grayColor } from "../components/constants/color.js"


// eslint-disable-next-line react-refresh/only-export-components
const Home = () =>{
return(
  <Box bgcolor={grayColor} height={"100%"} >

<Typography p={"2rem"} textAlign={"center"} variant="h5" >Select A friend to Chat</Typography>
  </Box>
)
}

// eslint-disable-next-line react-refresh/only-export-components
export default AppLayout()(Home)