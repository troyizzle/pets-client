import { useContext, useEffect, useReducer, createContext } from "react"
import { getToken } from "./TokenService";

export const CableStateContext = createContext({})

const reducer = (_state: any, action: any) => {
  switch (action.type) {
    case "setCable":
      return action.payload.cable;
    default:
      throw new Error(`No action named ${action.type}`)
  }
}

interface CableProviderProps {
  children: JSX.Element
}

export const CableProvider = ({ children }: CableProviderProps): JSX.Element => {
  let initialState = {}
  const token = getToken();
  const [state, dispatch] = useReducer(reducer, initialState)

  const ActionCable = async () => {
    const actionCable = (await import("actioncable")).default;
    const cable = await actionCable.createConsumer(
      `${process.env.NEXT_PUBLIC_CABLE}?token=${getToken()}`
    )

    return await cable
  }

  useEffect(() => {
    if (token === undefined) return;

    ActionCable().then((cable) => {
      initialState.cable = cable
      dispatch({ type: "setCable", payload: initialState })
    }
    )
  }, [token])

  return (
    <CableStateContext.Provider value={[state, dispatch]}>
      {children}
    </CableStateContext.Provider>
  )
}

export const useCable = () => useContext(CableStateContext)
