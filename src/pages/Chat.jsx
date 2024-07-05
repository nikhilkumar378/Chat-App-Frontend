/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */

import { Fragment, useRef } from "react"
import AppLayout from "../components/layout/AppLayout"
import  {grayColor } from "../components/constants/color.js";
import { IconButton, Stack } from "@mui/material";
import {AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material"
import { InputBox } from "../components/styles/StyledComponents.jsx";
import FileMenu from "../components/dialogs/FileMenu.jsx";
import MessageComponents from "../components/shared/MessageComponents.jsx";
import { sampleMessage } from "../components/constants/sampleData.js";

const user = {

  _id: "hgfhffh",
  name: "Nikhil kumar Singh"
}

// eslint-disable-next-line no-unused-vars, react-refresh/only-export-components
const  Chat = () =>{

  // eslint-disable-next-line no-unused-vars
  const fileMenuRef = useRef("");
  const containerRef = useRef(null);

  return(
    <Fragment>
    
    <Stack
    
    ref={containerRef}
    boxSizing={"border-box"}
    padding={"1rem"}
    spacing={"1rem"}
    bgcolor={grayColor}
    height={"90%"}
    sx = {{
      overflowX: "hidden",
      overflowY: "auto"
    }}
    >
{

sampleMessage.map((i)=>(
  <MessageComponents message={i} user={user} key={i._id}></MessageComponents>
))

}


    </Stack>

    <form
    style={{
      height: "10%"
    }}
    >
 <Stack
 direction={"row"}
 alignItems={"center"}
 height={"100%"}
 
 padding={"1rem"}
 position={"relative"}
 
 >
<IconButton
sx={{
  position : "absolute",
  left: "1.5rem",

}}



>

  <AttachFileIcon/>

  
</IconButton>

<InputBox placeholder="Type Message here..."/>


<IconButton
type="submit"
sx={{
  bgcolor: "violet",
  color: "white",
  marginLeft: "1rem",
  padding: "0.5rem",
  "&:hover": {
    bgcolor: "error.dark"
  }
}}


>

  <SendIcon></SendIcon>
</IconButton>

 </Stack>


    </form>
    
    
    
    
<FileMenu/>

    </Fragment>



  )
  }
  
  // eslint-disable-next-line react-refresh/only-export-components
  export default AppLayout()(Chat)