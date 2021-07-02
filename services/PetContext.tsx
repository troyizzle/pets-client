// @ts-nocheck
import { createContext, useEffect, useReducer, useContext } from "react";
import { petReducer, SetPet } from "../src/pet";
import paths from "../utils/Paths";
import { APIRequest } from "./APIRequest";
import { useAuth } from "./AuthStateContext";
import { petInitialState, PetState } from "../src/pet";

export const PetStateContext = createContext<PetState>(petInitialState);

interface PetProviderProps {
  children: JSX.Element
}

export const PetProvider = ({ children }: PetProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(petReducer, petInitialState)
  const [user] = useAuth();

  useEffect(() => {
    if (!user['id']) {
      return;
    }

    APIRequest(paths.myPet)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data
          dispatch(SetPet(data === null ? {} : data))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [user])

  return (
    <PetStateContext.Provider value={[state, dispatch]}>
      {children}
    </PetStateContext.Provider>
  )
}

export const usePet = () => useContext(PetStateContext)
