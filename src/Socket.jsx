

import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./components/constants/config.js";

const SocketContext = createContext();


const GetSocket = () => useContext(SocketContext);

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {

  const socket = useMemo(
    () => io(server, { withCredentials: true }),
    []
  );
 

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};



export {SocketProvider, GetSocket};