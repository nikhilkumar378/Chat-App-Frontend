/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  KeyboardBackspace as KeyBoardBackspaceIcon,
  Menu as MenuIcon, Edit as EditIcon, Done as DoneIcon
  , Add as AddIcon, Delete as DeleteIcon
} from "@mui/icons-material";
import { bgGradient, matblack } from "../components/constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Suspense, lazy, memo, useState } from "react";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../components/constants/sampleData";
import { useEffect } from "react";
import ConfirmDeleteDialog from "../components/dialogs/confirmDeleteDialog";
import UserItem from "../components/shared/UserItem";


const confirmDeleteDialog = lazy(() => import("../components/dialogs/confirmDeleteDialog"))

const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))
const isAddMember = false;
const Groups = () => {
  const chatId = useSearchParams()[0].get("group")
  console.log(chatId)
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate("/");
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const[confirmDeleteDialog, setconfirmDeleteDialog] = useState(false)

  const handlemobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = ()=>{
    setisEdit(false)
    console.log("update group name")
  }

  const[groupName, setGroupName] = useState("")
  const[groupNameUpdatedValue, setgroupNameUpdatedValue] = useState("")


  const openconfirmDeleteHandler = ()=>{
    setconfirmDeleteDialog(true)
    console.log("Delete Group")
  }

  const closeconfirmDeleteHandler = ()=>{
    setconfirmDeleteDialog(false)
    
  }

  const openAddMemberHandler = ()=>{
    console.log("Add member")
  }

  const deleteHandler = ()=>{
    console.log(" Delete Handler")
    closeconfirmDeleteHandler();
  }

  const removeMemberHandler = ()=>{
    console.log(" Remove Handler")
  }

  useEffect(() => {

    if(chatId){

      setGroupName(`Group Name ${chatId}`)
      setgroupNameUpdatedValue(`Group Name ${chatId}`)
     
    }

return ()=>{
  setGroupName("")
  setgroupNameUpdatedValue("")
  setisEdit(false)
}

    }
  , [chatId])
  

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handlemobile}>
          <MenuIcon open={false} />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matblack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyBoardBackspaceIcon></KeyBoardBackspaceIcon>
        </IconButton>
      </Tooltip>
    </>

  );


  const GroupName =(
<Stack direction={"row"} alignItems={"center"} justifyContent={"center"}
spacing={"1rem"}
padding={"3rem"}

>
{  isEdit ? (
  <> 
  <TextField value = {groupNameUpdatedValue} onChange={(e)=>setgroupNameUpdatedValue(e.target.value)} />
  <IconButton onClick={updateGroupName}>
    <DoneIcon></DoneIcon>
  </IconButton>
  
  </>
): (
  <>
  <Typography variant="4">{groupName}</Typography>
  <IconButton onClick={() => setisEdit(true)}>
    <EditIcon/>
  </IconButton>
  </>
)
}
</Stack>
  
      
)

const ButtonGroup = (<Stack

direction={{
  sm: "row",
  xs: "column-reverse"
}}
spacing={"1rem"}
p={{
  sm :"1rem",
  xs: "0rem",
  md: "1rem 4rem"
}}


>

<Button size="large" variant="text" color="error" startIcon={<DeleteIcon/>} onClick={openconfirmDeleteHandler} >Delete member</Button>
<Button size="large" variant="contained" startIcon={<AddIcon/>} onClick={openAddMemberHandler} >Add member</Button>


</Stack>
)

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}

     { groupName && <>


     {GroupName}


<Typography

alignSelf={"flex-start"}
margin={"2rem"}
variant="body1"

>members</Typography>

<Stack
maxWidth={"45rem"}

width={"100%"}
boxSizing={"border-box"}
height={"50vh"}
spacing={"2rem"}
overflow={"auto"}
padding={{
  sm: "1rem",
  xs: "0rem",
  md: "1rem 4rem",

}}
>


{

}

{
  sampleUsers.map((i)=>(
    <UserItem
     user={i}
      key={i._id} 
      isAdded 
      styling={{
        boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)",
        padding: "1rem 2rem",
        borderRadius: "1rem"
    }}
    handler={removeMemberHandler}
    
    ></UserItem>
  ))
}

</Stack>

{ButtonGroup}

     </> }
      </Grid>



      {isAddMember && (
<Suspense fallback={<Backdrop open/>}  >

<AddMemberDialog/>

</Suspense>



      )}


      {confirmDeleteDialog && ( <Suspense fallback={<Backdrop open />} >
        
      <ConfirmDeleteDialog open={confirmDeleteDialog}
       handleClose={closeconfirmDeleteHandler}
       deleteHandler={deleteHandler}
      
      ></ConfirmDeleteDialog>
        
        </Suspense>)}

      <Drawer
        sx={{ 
          display: { xs: "block", sm: "none" 

          }}}
          
         
        open={isMobileMenuOpen}
        onClose={handleMobileClose}

      >
      
        <GroupsList myGroups={sampleChats} chatId={chatId} w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}
  
  bgcolor="background-color: #0093E9;
  background-image: linear-gradient(114deg, #149ff1 0%, #c8f1ec 100%);"
  height={"100%"}
  
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id}/>
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link to={`?group=${_id}`}  onClick={(e) =>{
      if(chatId === _id) e.preventDefault();
    }} >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
        <AvatarCard avatar={avatar} />

        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
