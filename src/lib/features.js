/* eslint-disable no-unused-vars */

import moment from "moment";

const fileFormat = (url = "") =>{
const fileExt = url.split(".").pop();

if(fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
  return "video"


if(fileExt === "mp3" || fileExt === "wav")
  return "audio"

if(fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "gif")
  return "image"


return "file";

}


const getLast7Days = ()=>{

  const currentDate = moment()

  const last7Days = [];
  

  for(let i = 0; i < 7; i++){
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName)
  }

   return last7Days;

}

//https://res.cloudinary.com/durw3mdnx/image/upload/dpr_auto/w_300/v1722845664/4a3ab033-537d-4a9d-bb18-f72234231348.jpg

const transformImage = (url = "", width = 100) => {
  if (!url.includes("upload/")) {
    // console.warn("URL does not contain 'upload/'. Returning original URL.");
    return url;
  }

  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  return newUrl;
};


//page refresh krne pr data rahna chahiye
const getOrSaveFromStorage = ({key, value, get}) =>{
  if(get)
    return localStorage.getItem(key)
  ? JSON.parse(localStorage.getItem(key))
  : null;
  else localStorage.setItem(key, JSON.stringify(value));
}


export {fileFormat, transformImage, getLast7Days, getOrSaveFromStorage}