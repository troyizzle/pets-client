export enum UserAction {
  Set = 'setAuth',
  Remove = 'removeAuth'
}

export interface User {
  id: string,
  type: string,
  attributes: {
    username: string,
    email: string,
    admin: boolean
  }
}

export const initialUserState: {} = {}

type Action = {
  type: UserAction,
  payload: User | {}
}

export const SetAuth = (data: User): Action => ({
  type: UserAction.Set,
  payload: data
})

export const RemoveAuth: Action = {
  type: UserAction.Remove,
  payload: {}
}

export function userReducer(_state: User | {}, action: Action): User | {} {
  const { type, payload } = action;

  switch (type) {
    case UserAction.Set:
      return payload;
    case UserAction.Remove:
      return {}
    default:
      return {}
  }
}
