import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../components/constants/config";

const adminLogin = createAsyncThunk("admin/login", async (secretkey) => {
  // console.log("jayega data",secretkey)

  try {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${server}/api/v1/admin/verify`,
      { secretkey },
      config
    );
    // console.log("aaya kya data",data);
    return data.message;
  } catch (error) {
    console.error("Axios Error:", error); // Log the whole error object
    console.error("Error Response:", error.response?.data); // Log the response data if available
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    throw errorMessage;
  }
});

const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/`, {
      withCredentials: true,
    });
    
    return data.admin;
  } catch (error) {
    console.error("Axios Error:", error); // Log the whole error object
    console.error("Error Response:", error.response?.data); // Log the response data if available
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    throw errorMessage;
  }
});


const adminLogout = createAsyncThunk("admin/logout", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/logout`, {
      withCredentials: true,
    });
    
    return data.message;
  } catch (error) {
    console.error("Axios Error:", error); // Log the whole error object
    console.error("Error Response:", error.response?.data); // Log the response data if available
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    throw errorMessage;
  }
});

export { adminLogin, getAdmin ,adminLogout};
