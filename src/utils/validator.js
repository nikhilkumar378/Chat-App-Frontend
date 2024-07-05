// eslint-disable-next-line no-unused-vars

import { isValidUsername } from "6pp"

export const usernameValidator =  (username) => {
  if(!isValidUsername(username))
 return { isValid: false,
  errorMessage: "Username is Invalid"}
}