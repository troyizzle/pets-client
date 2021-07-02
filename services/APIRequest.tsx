import axios from "axios";
import { getToken } from "./TokenService";

export const APIRequest = (url: string, method?: string, data?: any | undefined) => {
  return axios({
    method: method,
    url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
    headers: {
      Authorization: getToken(),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: typeof data === "undefined" ? null : JSON.stringify(data),
  });
};
