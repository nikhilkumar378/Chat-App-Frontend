import {createSlice} from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../components/constants/event";


const initialState = {
 //localstorage me hoga to usko hi initialstate man lega nhi hoga tab empty manega.
notificationCount: 0,
newMessageAlert: getOrSaveFromStorage({key:NEW_MESSAGE_ALERT, get:true }) ||[
  {
    //jab chatid new hogi tab push krenge 
    chatId: "",
     //sameperson ko msg ja rha h to count incraese krenge
    count:0,
  }
]
}

const chatSlice = createSlice({
name: "chat",
initialState, 
reducers: {
 incrementNotification: (state) =>{
  state.notificationCount = state.notificationCount +1;
 },

 resetNotificationCount: (state) =>{
  state.notificationCount = 0;
 },

 setNewMessageAlert: (state, action) => {

  const chatId = action.payload.chatId;

  const index = state.newMessageAlert.findIndex(
    (item)=> item.chatId === chatId
  );
  if(index !== -1){
   //wo upar jo array h uske count ko increase kr denge, agr
    state.newMessageAlert[index].count += 1;
  }else{
    state.newMessageAlert.push({
      chatId,
      count:1,
    })
  }
 },

 //jis se send kara or jisko kara
 //jo v hume delete krni h uski chat id pass krni h esme
 removeNewMessageAlert: (state, action) =>{
  state.newMessageAlert = state.newMessageAlert.filter((item) => item.chatId !== action.payload);
 }

}

})

export default chatSlice;
export const {incrementNotification, resetNotificationCount, setNewMessageAlert,removeNewMessageAlert} = chatSlice.actions;