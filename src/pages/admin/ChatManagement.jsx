/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Stack } from "@mui/material";
import { dashboardData } from "../../components/constants/sampleData";
import { transformImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard";
import { Key } from "@mui/icons-material";


const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },

  {
    field: "totalmembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },

  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => {
      
     return <AvatarCard max={100}  avatar={params.row.members} />
    },
  },

  {
    field: "totalmessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },

  {
    field: "creator",
    headerName: "created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar
          
          alt={params.row.creator.name}
          src={params.row.creator.avatar}
        ></Avatar>
        <span> {params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.chats.map((i) => ({
       
     ...i,
       id: i._id,
              avatar: i.avatar.map((i) =>  transformImage(i, 50)),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table heading={"All Chats"}   columns={columns} rows={rows}  ></Table>
    </AdminLayout>
  );
};

export default ChatManagement;
