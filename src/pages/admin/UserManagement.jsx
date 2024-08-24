/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Skeleton } from "@mui/material";
import { dashboardData } from "../../components/constants/sampleData";
import { transformImage } from "../../lib/features";
import { useFetchData } from "6pp";
import { server } from "../../components/constants/config";
import { useErrors } from "../../hooks/hook";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "avatar",
    headerName: "avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },

  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "updatedAt",
    headerName: "Updated At",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    "dashboard-users"
  );

  useErrors([
    {
      isError: error,
      error: useErrors,
    },
  ]);
  // console.log(data);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if(data){
      setRows(
        data.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {loading ? (
       <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All users"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
