/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from "../shared/UserItem"

const AddMemberDialog = ({addmember, isLoadingAddMember, chatId}) => {

 

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

 
  const closeHandler = () =>{
    setSelectedMembers([])
      setMembers([])
    
  }

  const addmemberSubmitHandler = ()=>{
    closeHandler()
  }
  return (
    
  <Dialog open onClose={closeHandler}>
<Stack spacing={"1rem"} width={"20rem"} p={"2rem"} >
  <DialogTitle textAlign={"center"}  >
    Add Member ?


    <Stack spacing={"1rem"}>
      {
 members.length > 0 ? members.map((i)=>(
  <UserItem  isAdded={selectedMembers.includes(i._id)} key={i._id} user={i} handler={selectMemberHandler}></UserItem>
)) : <Typography textAlign={"center"}>No Friends</Typography>
      }
    </Stack>
  </DialogTitle>

<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
  <Button onClick={closeHandler} variant='text' color='error'>cancel</Button>
  <Button onClick={selectMemberHandler} variant='contained' disabled={isLoadingAddMember}>submit changes</Button>
</Stack>

</Stack>

  </Dialog>
  
)}

export default AddMemberDialog