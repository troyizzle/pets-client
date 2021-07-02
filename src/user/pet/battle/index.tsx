import { createContext, useContext, useReducer } from "react"
import { UserPetType } from "../index"

export interface UserPetBattleType {
  data: {
    id: string,
    type: string,
    attributes: {
      winner: null | number
    }
  },
  included: UserPetType[]
}

const userPetBattleInitialState = {
  isLoading: true,
  data: {}
}

type UserPetBattleState = {
  isLoading: boolean,
  data: UserPetBattleType | {}
}

enum UserPetBattleAction {
  Set = 'setData',
  Remove = 'removeData'
}

type Action = {
  type: UserPetBattleAction,
  payload: UserPetBattleType | {}
}

export const SetUserPetBattle = (data: UserPetBattleType): Action => ({
  type: UserPetBattleAction.Set,
  payload: data
})

const RemoveUserPetBattle = (): Action => ({
  type: UserPetBattleAction.Remove,
  payload: {}
})

function userPetBattleReducer(_state: UserPetBattleState, action: Action): UserPetBattleState {
  const { type, payload } = action;
  switch (type) {
    case UserPetBattleAction.Set:
      return {
        isLoading: false,
        data: payload
      }
    case UserPetBattleAction.Remove:
      return {
        isLoading: false,
        data: {}
      }
    default:
      return {
        isLoading: false,
        data: {}
      }
  }
}

const UserPetBattleStateContext = createContext<UserPetBattleState>(userPetBattleInitialState);

interface UserPetBattleProps {
  children: JSX.Element
}

export const UserPetBattleProvider = ({ children }: UserPetBattleProps): JSX.Element => {
  const [state, dispatch] = useReducer(userPetBattleReducer, userPetBattleInitialState)

  return (
    <UserPetBattleStateContext.Provider value={[state, dispatch]}>
      {children}
    </UserPetBattleStateContext.Provider>
  )
}

export const useUserPetBattle = () => useContext(UserPetBattleStateContext)
