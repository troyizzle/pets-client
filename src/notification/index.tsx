// @ts-nocheck Fix this!!
enum NotificationStatuses {
  Unread = "unread",
  Read = "read",
  Deleted = "deleted"
}

enum NotificationAction {
  Set = "setNotifications",
  Add = "addNotification",
  Read = "readNotification",
  Delete = "deleteNotification",
}


type Action = {
  type: NotificationAction,
  payload: NotificationType
}

export const SetNotifications = (data: NotificationType[]): Action => ({
  type: NotificationAction.Set,
  payload: data
})

export const AddNotification = (data: NotificationType): Action => ({
  type: NotificationAction.Add,
  payload: data
})

export function notificationReducer(state: NotificationType[] | [], action: Action): Array<NotificationType> {
  const { type, payload } = action;

  switch (type) {
    case NotificationAction.Set:
      return payload;
    case NotificationAction.Add:
      return [...state, payload]
    case NotificationAction.Read:
      let index = findIndex(state, payload)
      let newState = [...state]
      newState[index] = payload
      return newState
    case NotificationAction.Delete:
      return state.filter(
        (n) => n.id !== payload.id
      )
    default:
      return payload
  }
}

const findIndex = (notifications: NotificationType[], notification: NotificationType): number => {
  return notifications.findIndex((n) => n.id === notification.id)
}

export interface NotificationType {
  id: string,
  type: string,
  attributes: {
    status: NotificationStatuses,
    message: string
    notifiable_id?: number,
    notifiable_type?: string
  }
}
