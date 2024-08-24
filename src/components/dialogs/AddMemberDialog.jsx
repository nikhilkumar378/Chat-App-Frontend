/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/misc";
import { sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  const{isLoading, data, isError, error} = useAvailableFriendsQuery(chatId);

 
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  const addmemberSubmitHandler = () => {
    addMembers("Adding Members...", {members:selectedMembers, chatId});
    closeHandler();

  };

  console.log(data);

  useErrors([{isError, error}]);
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack spacing={"1rem"} width={"20rem"} p={"2rem"}>
        <DialogTitle textAlign={"center"}>
          Add Member ?
          <Stack spacing={"1rem"}>
            {isLoading ? (<Skeleton/>) :
            
            data?.friends?.length> 0 ? (
              data?.friends?.map((i) => (
                <UserItem
                  isAdded={selectedMembers.includes(i._id)}
                  key={i._id}
                  user={i}
                  handler={selectMemberHandler}
                ></UserItem>
              ))
            ) : (
              <Typography textAlign={"center"}>No Friends</Typography>
            )}
          </Stack>
        </DialogTitle>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button onClick={closeHandler} variant="text" color="error">
            cancel
          </Button>
          <Button
            onClick={addmemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            submit changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
