/* eslint-disable react/display-name */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";
import { useGetNotificationsQuery } from "../../redux/api/api";

import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const {isNotification} = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const {isLoading, data, error, isError} = useGetNotificationsQuery();

  const friendRequestHandler = ({ _id, accept }) => {};

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{error, isError}]);


  return (
    <Dialog open={isNotification} onClose={closeHandler}  >
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
 
 {
  isLoading? (<Skeleton/>) : <>
  {data?.allRequests.length.length > 0 ? (
          data?.allRequests.map(({ sender, _id }) => (
            <NotificationItem
              sender={sender}
              _id={_id}
              key={_id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>0 Notification</Typography>
        )}</>
 }
        
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={transformImage()} />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >{`${name} sent you a friend request`}</Typography>

        <Stack
          sx={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
