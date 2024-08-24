/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import moment from "moment";
import React, { memo } from "react";
import { fileFormat } from "../../lib/features";
import RenderAttachments from "./RenderAttachments";
import {motion} from 'framer-motion';

const MessageComponents = ({ message, user }) => {

  if (!message) {
    return null; // Or return a fallback UI
  }
  
  const { sender, content, attachments = [], createdAt } = message;

  const timeAgo = moment(createdAt).fromNow()

  const samesender = sender?._id === user?._id;

  // console.log(sender?._id, user?._id)
  return (
    <motion.div
    initial={{opacity: 0, x: "-100%"}}
    whileInView={{opacity:1, x:0}}
      style={{
        alignSelf: samesender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      { !samesender && (<Typography  color={lightBlue} variant="caption" fontWeight={"600"} > {sender.name}</Typography>)}
      {content && <Typography>{content}</Typography>}

      {

       
      
      attachments?.length > 0 && 

      attachments.map((attachment, index)=>{

        const url = attachment.url;
        const file = fileFormat(url)


        return(

          <Box key={index}>

            <a href={url} target="blank" download style={{color: "black"}}>
{RenderAttachments(file, url)}

            </a>

          </Box>
        )


      })
      
      
      }

      {<Typography  variant="caption" color={"text.secondary"} >{timeAgo}</Typography>}
    </motion.div>
  );
};

export default memo(MessageComponents);
