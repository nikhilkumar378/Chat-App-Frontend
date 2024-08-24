/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { useMyChatsQuery } from "../../redux/api/api";
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducers/misc";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";
import { GetSocket } from "../../Socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../constants/event";
import {
  incrementNotification,
  setNewMessageAlert,
} from "../../redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";

const AppLayout = () => (WrappedComponent) => {
  // eslint-disable-next-line no-unused-vars, react/display-name
  return (props) => {
    const params = useParams();
    //wo mem remove krne pr v uska chat nhi ja rha tha or upr me id v show ho rha tha
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    //Setting up Socket for chat

    const socket = GetSocket();
    // console.log(socket.id);

    const { isMobile } = useSelector((state) => state.misc);

    //to show avatar in profile
    const { user } = useSelector((state) => state.auth);

    const { newMessageAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery();

    useErrors([{ isError, error }]);

    // console.log(data);

    //jab v newmessagealert ki array change ho tab tab hume ye re re run krna hai
    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
    }, [newMessageAlert]);

    const handleDeleteChat = (e, _id, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({chatId, groupChat}));
      deleteMenuAnchor.current = e.currentTarget;
      // e.preventDefault();
      // console.log("Delete Chat", _id, groupChat);
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    //TO Show notification of new Messages

    const newMessageAlertListner = useCallback(
      (data) => {
        // prevents dispatching an alert if the new message belongs to the current chat
        if (data.chatId === chatId) return;
        dispatch(setNewMessageAlert(data));
      },
      [chatId, dispatch]
    );

    //ye wala function call ho rha h eska matlb new request wala event trigger ho rha h.
    const newRequestListner = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListner = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListner = useCallback((data) => {
    setOnlineUsers(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListner,
      [NEW_REQUEST]: newRequestListner,
      [REFETCH_CHATS]: refetchListner,
      [ONLINE_USERS]: onlineUsersListner
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title title="Chat App"></Title>
        <Header />
        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor}  />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            {/* {console.log(data)} */}
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessageAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container width={"full"} height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessageAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
            height={"100%"}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
