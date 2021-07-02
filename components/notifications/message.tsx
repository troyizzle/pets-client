import { NotificationType } from "../../src/notification";
import Button from "../Button";

interface NotificationMessageProps {
  notification: NotificationType
}

export default function NotificationMessage(props: NotificationMessageProps): JSX.Element {
  const { notification } = props
  if (!notification.attributes.notifiable_type) {
    return (
      <div>
        {notification.attributes.message}
      </div>
    )
  }

  return (
    <div>
      {notification.attributes.message}
      Click here to accept the <Button disabled={false} label="duel" type="link" href={`/battles/${notification.attributes.notifiable_id}`} />
    </div>
  )
}
