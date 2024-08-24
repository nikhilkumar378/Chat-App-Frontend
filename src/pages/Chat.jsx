/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { grayColor } from "../components/constants/color.js";
import { IconButton, Skeleton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents.jsx";
import FileMenu from "../components/dialogs/FileMenu.jsx";
import MessageComponents from "../components/shared/MessageComponents.jsx";

import { GetSocket } from "../Socket.jsx";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../components/constants/event.js";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api.js";
import { useErrors, useSocketEvents } from "../hooks/hook.jsx";

import {useInfiniteScrollTop} from "6pp"
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc.js";
import { removeNewMessageAlert } from "../redux/reducers/chat.js";
import { TypingLoader } from "../components/layout/Loaders.jsx";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);


  const socket = GetSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  //messages ka array create krenge..
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const[fileMenuAnchor, setFileMenuAnchor] = useState(null); 

  const [IamTyping, setIamTyping] = useState(false);

  const [userTyping, setUserTyping] = useState(false)
  
const typingTimeout = useRef(null);
console.log(userTyping);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  //chunk me message

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  //console.log(page)

  //sroll krne pr page no increase hoga or upar wala function trigger hoga, phir jo v data aayega oldmsg k form me ayega

  const {data: oldMessages, setData:setOldMessages} = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,  
    oldMessagesChunk.data?.messages 
  )

  // console.log(chatDetails?.data?.chat);




  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  // console.log("oldMessages", oldMessages);

  const members = chatDetails?.data?.chat?.members;

  // console.log(chatDetails?.data);


  //Chat krte time typing show hone k liye jugad
  //jaise hi type krunga waise hi emit hoga
  const messageOnchange = (e) =>{
    setMessage(e.target.value);

    if(!IamTyping){

      socket.emit(START_TYPING, {members, chatId})
      setIamTyping(true);
    }

     //har bar new timeout lene se pahle, pahle wala clear ho jayega  
    if(typingTimeout.current) clearTimeout(typingTimeout.current);
 
      
    //yaha se settimout ka id le lenge
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, {members, chatId})
      setIamTyping(false);
     
    }, [2000]);
  }



  const handleFileOpen = (e) =>{
dispatch(setIsFileMenu(true));
setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //taki khali space na bhej de koi
    if (!message.trim()) return;

    //backend k app.js me jo code likha h new message trigger ka waha se chatid, members, message data diya gya h to wahi lenge

    //Emitting message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });

    setMessage("");
  };


  //chatlist me alg alg memebers ko msg send krte time koi prblm na ho
//jaise chatid change hogi ye fun run hoga
  useEffect(() =>{
  socket.emit(CHAT_JOINED, {userId:user._id , members});
    dispatch(removeNewMessageAlert(chatId));

  return () =>{
    setMessages([]);
    setMessage("");
      setOldMessages([]);
    setPage(1);
    socket.emit(CHAT_LEAVED, {userId:user._id , members});
  };
    
  }, [chatId,dispatch, setOldMessages]);


  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  

  useEffect(() =>{
    //agr data k ander chat nhi h to, koi chatid khol k access kre to redirect kr do
  if(chatDetails.isError) return navigate("/")

  },[chatDetails.isError]);


  //recreate naho bar bar esliye usecall back me rakh diya
  const newMessageListner = useCallback((data) => {
    //alag alag chatId h to data k andr messg append nhi hoga
    if(data?.chatId !== chatId) return;
    console.log(data);
    setMessages((prev) => [...prev, data?.message]);
  }, [chatId]);


  //backend se jo event emit hua usko yaha handle krenge

  const startTypingListner = useCallback((data) => {
    //alag alag chatId h to data k andr messg append nhi hoga
    if(data.chatId !== chatId) return;
    // console.log("start - typing",data);
     setUserTyping(true);
  }, [chatId]);


  //yaha listen kro
  const stopTypingListner = useCallback((data) => {
    if(data.chatId !== chatId) return;
    // console.log("stop - typing",data);
    setUserTyping(false);
  }, [chatId]);


  const alertListner = useCallback(({data}) =>{

    if(data.chatId !== chatId) return;
    const messageForAlert = {

      content:data.message,
     
      sender: {
        _id: "ksdbkdsbckdsbc",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

  setMessages((prev) => [...prev, messageForAlert])

  },[chatId])

  const eventHandlers = {
    [ALERT]: alertListner,
     [NEW_MESSAGE]: newMessageListner,
    [START_TYPING] : startTypingListner,
    [STOP_TYPING]:stopTypingListner
    };

  useSocketEvents(socket, eventHandlers);
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages]

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
       

        {allMessages?.map((i) => (
          <MessageComponents
            key={i._id}
            message={i}
            user={user}
          ></MessageComponents>
        ))}

      
       {userTyping && <TypingLoader/>} 
        
        <div ref={bottomRef} />


      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
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
              position: "absolute",
              left: "1.5rem",
              rotate:"30deg",
            }}
            onClick={handleFileOpen}

          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message here..."
            value={message}
            onChange={messageOnchange}
          />

          <IconButton
            type="submit"
            sx={{
              bgcolor: "violet",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon></SendIcon>
          </IconButton>
        </Stack>
      </form>

      <FileMenu  anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppLayout()(Chat);
