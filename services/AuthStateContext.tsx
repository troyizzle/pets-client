import { useEffect, createContext, useReducer, useContext } from "react";
import paths from "../utils/Paths";
import { APIRequest } from "./APIRequest";
import { getToken, removeToken } from "./TokenService";
import { User, userReducer, initialUserState, SetAuth } from "../src/user";

export const AuthStateContext = createContext<User | {}>({});

interface AuthProviderProps {
  children: JSX.Element
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, initialUserState)

  const jwt_token = getToken();

  useEffect(() => {
    if (jwt_token === undefined) return;

    APIRequest(paths.whoami).then((res) => {
      if (res.status === 200) {
        const { data } = res.data
        dispatch(SetAuth(data))
      }
    })
      .catch((err) => {
        // TODO: Change this?
        if (err.response.data.error == "Signature has expired") {
          removeToken()
        }
        console.log("Auth provider error", err)
      })
  }, [jwt_token])

  return (
    <AuthStateContext.Provider value={[state, dispatch]}>
      {children}
    </AuthStateContext.Provider>
  )
}

export const useAuth = () => useContext(AuthStateContext)
