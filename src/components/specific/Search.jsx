/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { useInputValidation } from "6pp";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../constants/sampleData";

const Search = () => {
  const addFriendHandler = (id) => {
    console.log(id);
  };

  let isLoadingSendFriendRequest = false;

  const [users, setUsers] = useState(sampleUsers);
  const search = useInputValidation("");
  return (
    <Dialog open>
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
