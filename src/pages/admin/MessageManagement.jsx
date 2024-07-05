/* eslint-disable no-unused-vars */
import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Avatar, Stack } from '@mui/material'
import AvatarCard from "../../components/shared/AvatarCard"

const columns = [{
  field: "id",
  headerName: "ID",
  headerClassName: "table-header",
  width: 200
},

{
  field: "avatar",
  headerName: "avatar",
  headerClassName: "table-header",
  width: 150,
  renderCell: (params)=>(
    <AvatarCard  src={params.row.avatar} />  )
}
,
{
  field: "name",
  headerName: "Name",
  headerClassName: "table-header",
  width: 300
},


{
  field: "totalmembers",
  headerName: "Total Members",
  headerClassName: "table-header",
  width: 120
},


{
  field: "members",
  headerName: "Members",
  headerClassName: "table-header",
  width: 400,
  renderCell:(params)=>{
    <AvatarCard max={100} avatar={params.row.members} ></AvatarCard>
  }
},


{
  field: "totalmessages",
  headerName: "Total Messages",
  headerClassName: "table-header",
  width: 120
},



{
  field: "creator",
  headerName: "created By",
  headerClassName: "table-header",
  width: 250,
  renderCell: (params)=>(
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
      <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} ></Avatar>
     <span> {params.row.creator.name}</span>
    </Stack>
  )
},




]

const MessageManagement = () => {
  return (

    <AdminLayout>


      <div>MessageManagement</div>
    </AdminLayout>
  )
}

export default MessageManagement