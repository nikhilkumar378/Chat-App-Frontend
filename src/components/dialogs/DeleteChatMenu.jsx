/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import { Menu, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../redux/api/api";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const DeleteChatMenu = ({dispatch, deleteMenuAnchor}) => {
  const navigate = useNavigate();
  const { isDeleteMenu, selectDeleteChat } = useSelector((state) => state.misc);


  
  console.log(selectDeleteChat)

  const [deleteChat, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation);

  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation)

  const isGroup =  selectDeleteChat.groupChat;
  

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

 const leaveGroupHandler = () =>{
  // if (!chatId) {
  //   console.error("Chat ID is undefined!");
  //   return;
  // }
  closeHandler();
  leaveGroup("Leaving group...", selectDeleteChat.chatId)
 }
 const deleteChatHandler = () =>{

  // if (!chatId) {
  //   console.error("Chat ID is undefined!");
  //   return;
  // }
  closeHandler();
  deleteChat("Deleting Chat...", selectDeleteChat.chatId)
 }

 useEffect(() =>{

  if(deleteChatData || leaveGroupData) navigate("/");

 },[deleteChatData, leaveGroupData])

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical:"bottom",
        horizontal:"right"
      }}
      transformOrigin={{
        vertical: "center",
        horizontal:"center"
      }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"o.5rem"}
        onClick={isGroup ? (leaveGroupHandler): (deleteChatHandler) }
      >
        {
          isGroup? (<> <ExitToAppIcon/> <Typography>Leave Group</Typography> </>): (<><DeleteIcon/> <Typography>Delete Chat</Typography></>)
        }
      </Stack>
    </Menu>
  );
};


export default DeleteChatMenu;
