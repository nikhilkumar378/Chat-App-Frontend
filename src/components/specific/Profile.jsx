/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {Face as FaceIcon, 
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon
} from "@mui/icons-material"

import moment from "moment"

const Profile = () => {
  return (

   <Stack spacing={"2rem"} deirections={"column"} alignItems={"center"}>

    <Avatar 
    sx={{
      width: 200,
      height: 200,
      objectFit: "contain",
      marginBottom: "1rem",
      border: "5px solid white"
    }}
    
    
    />

      
{<ProfileCard heading={"Bio"} text={"Mai hoo don"} />}
{<ProfileCard heading={"UserName"} text={"menikhil"} Icon={<FaceIcon/>}/>}
{<ProfileCard heading={"Name"} text={"Nikhi Kumar"} Icon={<UserNameIcon/>}/>}
{<ProfileCard heading={"Joined"} text={moment('2024-05-06T00:00:00.000Z').fromNow(
)} Icon={<CalendarIcon/>}/>}



    {/* <ProfileCard heading={"Bio"} text={"Mai Hoo Don"}/>
    <ProfileCard heading={"Username"} Icon={<UserNameIcon/>} text={"menikhilkumar"}/>
    <ProfileCard heading={"Name"} Icon={<FaceIcon/>} text={"Nikhil Kumar"}/> */}

    {/* <ProfileCard heading={"joined"} Icon={<CalendarIcon/>} text={moment}/> */}

    



   </Stack>

    
    
  )

 

    
   
}
const ProfileCard = ({text, Icon, heading})=> (
<Stack 
direction={"row"}
alignItems={"center"}
spacing={"1rem"}
color={"white"}
textAlign={"center"}

>

{Icon && Icon}

<Stack>
  <Typography variant="body1" >{text}</Typography>
  <Typography color={"gray"} variant="caption" >{heading}</Typography>
</Stack>

</Stack>


)

export default Profile