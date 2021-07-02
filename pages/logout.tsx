import { useLayoutEffect } from "react";
import { redirect } from "../services/NavService";
import { removeToken } from "../services/TokenService";


const Logout = (): null => {
  useLayoutEffect(() => {
    removeToken().then(() => {
      redirect("/");
    })
  })
  return null;
}

export default Logout;
