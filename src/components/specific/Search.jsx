/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserItem from "../shared/UserItem";
// import { sampleUsers } from "../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";

import { useAsyncMutation } from "../../hooks/hook.jsx";



const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
 const [searchUser] = useLazySearchUserQuery();
 const [sendFriendRequest,isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);
  const dispatch = useDispatch();

  
  
  const search = useInputValidation("");


 
  const [users, setUsers] = useState([]);


  const addFriendHandler = async (id) => {
   
    await sendFriendRequest("Sending friend request...", {userId: id});
  };


  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() =>{
    const timeOutId = setTimeout(() =>{
     
     searchUser(search.value)
     .then(({data}) => setUsers(data.users))
     .catch((e)=> console.log(e));
    }, 1000);

    return ()=>{
      clearTimeout(timeOutId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search.value]);

   return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>

        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          varient="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            ></UserItem>
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
