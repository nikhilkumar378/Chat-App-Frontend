/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useInputValidation } from "6pp";

import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const dispatch = useDispatch()
  const{isNewGroup} = useSelector((state) => state.misc);
  const {isError, isLoading, error, data} = useAvailableFriendsQuery()
  const[newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
  const groupName = useInputValidation("");
 
  const [selectedMembers, setSelectedMembers] = useState([]);

  // console.log(data);

  const errors = [
    {
      isError,
      error
    }
  ]
  useErrors(errors)


  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  // console.log(selectedMembers);


  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  };

  const submitHandler = () => {
  // console.log(groupName.value, selectedMembers)
  if(!groupName?.value) return toast.error("Group name is required");

  if(selectedMembers.length < 2) 
    return toast.error("Please Select Atleast 3 Members");
  newGroup("Creating New Group",{name: groupName.value, members:selectedMembers});
//creating group
 closeHandler();
  };



  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} minWidth={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName?.value}
          onChange={groupName?.changeHandler}
        />
        <Typography variant="body1">members</Typography>
        <Stack>
          {isLoading ? (<Skeleton/>) : 
          (data?.friends?.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers?.includes(i._id)}
            ></UserItem>)
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="text" color="error" size="large" onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler} disabled={isLoadingNewGroup} >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
