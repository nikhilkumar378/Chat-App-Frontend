import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import { server } from "../../components/constants/config";


const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/`}),
  tagTypes: ["Chat", "User"], // ye caching krega mtlb jo v data aayega usko tempo store krtega, dobara api hit hone k wajaye wahi data load ho jayega 

  endpoints: (builder) => ({

    myChats: builder.query({
      query: () =>({
        url: "chat/my",
        credentials: "include",
      }),

      //jab koi new friend add krenge tab refetch ki jrurt hogi tab cached data ka use nhi ho payega

      providesTags: ["Chat"],
    }),
 
    searchUser: builder.query({
      //backend me jake dekhenge name chahiye..searchuser
      
        query: (name) => ({
          url: `user/search?name=${name}`,
          credentials: "include",
        }),
        providesTags: ["User"] 
      }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/sendrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),



    getNotifications: builder.query({
        query: () => ({
          url: `user/notifications`,
          credentials: "include",
        }),
       keepUnusedDataFor: 0,
      }),



      
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/acceptrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    })

   
  });


export default api;
export const {useMyChatsQuery, useLazySearchUserQuery, useSendFriendRequestMutation, useGetNotificationsQuery, useAcceptFriendRequestMutation} = api;