import React, { createContext, useEffect, useReducer, useContext } from "react";
import { APIRequest } from "./APIRequest";
import paths from "../utils/Paths";
import { useAuth } from "./AuthStateContext";
import { SetNotifications, NotificationType, notificationReducer } from "../src/notification";

export const NotificationStateContext = createContext<Notification[] | []>([]);

interface NotificationProviderProps {
  children: JSX.Element
}

export const NotificationProvider = ({ children }: NotificationProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(notificationReducer, [])

  // @ts-ignore: Fix this!
  const [user] = useAuth()

  useEffect(() => {
    if (!user['id']) {
      return;
    }
    APIRequest(paths.myNotifications)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data
          dispatch(SetNotifications(data))
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("Unauthorized")
        } else {
          console.error(err)
        }
      })
  }, [user])


  return (
    // @ts-ignore: Fix this!
    <NotificationStateContext.Provider value={[state, dispatch]}>
      {children}
    </NotificationStateContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationStateContext)
