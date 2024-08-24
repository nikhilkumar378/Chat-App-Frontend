/* eslint-disable no-unused-vars */
import { FileOpen as FileOpenIcon } from "@mui/icons-material";
import React from 'react';
import { transformImage } from '../../lib/features';

const RenderAttachments = (file, url) => {
  
   switch (File) {
    case "video":
      
      return <video src={url} preload='none' width={"200px"} controls/>;
      
    

      case "image":
        return(

          <img
          src ={transformImage(url, 200)} 
           alt="Attachment" 
           width={"200px"} 
           height={"150px"}
           style={{
   
             objectFit: "contain"
           }}
           
           />
        )
        


        case "audio":
          return(

            <audio src={url} preload='none' controls/>
          )
          

    default:
     return <FileOpenIcon></FileOpenIcon>
   }
  
}

export default RenderAttachments