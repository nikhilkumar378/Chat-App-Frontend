/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import  {Suspense, lazy, useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import LayoutLoader from './components/layout/Loaders'

import axios from "axios";
import {server} from "./components/constants/config.js"

import { useDispatch, useSelector } from 'react-redux';
import { userExists, userNotExists } from './redux/reducers/auth.js';

import {Toaster} from "react-hot-toast"



const Home = lazy(()=> import("./pages/Home"))
const Login = lazy(()=> import("./pages/Login"))
const Chat = lazy(()=> import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Groups"))
const Notfound = lazy(() => import("./pages/Notfound"))
const AdminLogin = lazy(()=> import("./pages/admin/AdminLogin"))
const UserManagement = lazy(()=> import( "./pages/admin/UserManagement"))
const ChatManagement = lazy(()=> import( "./pages/admin/ChatManagement"))
const Dashboard = lazy(()=> import( "./pages/admin/Dashboard"))
const MessageManagement = lazy(()=> import( "./pages/admin/MessageManagement"))



// let user = true; ab ye nhi redux auth wala user lenge
function App() {

  const {user, loader} = useSelector(state => state.auth)
 
  const dispatch = useDispatch();
  useEffect(()=>{

    axios
    .get(`${server}/api/v1/user/me`, {withCredentials: true})
    .then((data)=> dispatch(userExists(data.user)))
    .catch((err) => dispatch(userNotExists()));

  }, [dispatch]);

  return loader ?  (<LayoutLoader/>) : (
    <BrowserRouter>
   <Suspense fallback={<LayoutLoader/>}>
   <Routes>
      <Route element={<ProtectRoute user={user}/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/chat/:chatId' element={<Chat/>}/>
      <Route path='/groups' element={<Groups/>}/>

      </Route>
      <Route path='/login' element={
      
      <ProtectRoute user={!user} redirect="/">
       <Login/>
      </ProtectRoute>}/>

      <Route path='/admin' element={<AdminLogin/>}></Route>
      
      <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
      <Route path='/admin/messages' element={<MessageManagement/>}></Route>
      <Route path='/admin/users' element={<UserManagement/>}></Route>
      <Route path='/admin/chats' element={<ChatManagement/>}></Route>

      <Route path='*' element={<Notfound/>}/>
    </Routes>

   </Suspense>
   <Toaster position="bottom-center"/>
    </BrowserRouter>
  
      
   
    
  )
}

export default App
