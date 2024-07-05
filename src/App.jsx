/* eslint-disable no-unused-vars */
import  {Suspense, lazy} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import LayoutLoader from './components/layout/Loaders'





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


// eslint-disable-next-line no-unused-vars
let user = true; 
function App() {
 

  return (
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
    </BrowserRouter>
  
      
   
    
  )
}

export default App
