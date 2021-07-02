import clsx from "clsx"
import { TrashIcon, MailIcon, MailOpenIcon } from "@heroicons/react/outline"
import { APIRequest } from "../services/APIRequest";
import paths from "../utils/Paths";
import { useNotifications } from "../services/NotificationsContext";
import NotificationMessage from "./notifications/message";
import { NotificationType } from "../src/notification";

interface NotificationProps {
  active: boolean
  notification: NotificationType
}

export default function Notification(props: NotificationProps) {
  const { active, ...notification } = props;
  const [notifications, notificationsDispatch] = useNotifications()

  const styling = clsx(
    "block text-sm flex flex-row items-center justify-between",
    notification.attributes.status === "unread" ? "font-black" : "text-gray-700"
  )

  const handleNotification = (type: string) => {
    const id = notification.id
    switch (type) {
      case "read":
        APIRequest(paths.meReadNotification(id))
          .then((res) => {
            if (res.status === 200) {
              const { data } = res.data
              notificationsDispatch({ type: "readNotification", payload: data })
            }
          })
          .catch((err) => {
            console.log(err)
          })
        break;
      case "unread":
        APIRequest(paths.meUnreadNotification(id))
          .then((res) => {
            if (res.status === 200) {
              const { data } = res.data
              notificationsDispatch({ type: "unreadNotification", payload: data })
            }
          })
          .catch((err) => {
            console.log(err)
          })
        break;
      case "delete":
        APIRequest(paths.meDeleteNotification(id))
          .then((res) => {
            if (res.status === 200) {
              const { data } = res.data
              notificationsDispatch({ type: "deleteNotification", payload: data })
            }
          })
          .catch((err) => {
            console.log(err)
          })
        break;
      default:
        throw new Error(`Unknown notification for type ${type}`)
    }
  }

  return (
    <div className={styling}>
      <NotificationMessage notification={notification} />
      <div>
        {notification.attributes.status === "unread" ? (
          <MailIcon
            onClick={() => handleNotification("read")}
            className="h-6 hover:bg-gray-500 rounded" />
        ) : (
          <MailOpenIcon
            onClick={() => handleNotification("unread")}
            className="h-6 hover:bg-gray-500 rounded"
          />
        )
        }
      </div>
      <div>
        <TrashIcon
          onClick={() => handleNotification("delete")}
          className="h-6 hover:bg-gray-500 rounded"
        />
      </div>
    </div>
  )
}
