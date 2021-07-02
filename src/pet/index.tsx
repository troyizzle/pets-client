export interface PetType {
  id: string,
  type: string,
  attributes: {
    name: string,
    health: number,
    attack: number,
    hunger: number
    user_id: number,
    images_url: {
      name: string,
      path: string
    }[]
  }
}

export const petInitialState = {
  isLoading: true,
  pet: {}
}

export type PetState = {
  isLoading: boolean,
  pet: PetType | {}
}

export enum PetAction {
  Set = 'setPet',
  Remove = 'removePet'
}

type Action = {
  type: PetAction,
  payload: PetType | {},
}

export const SetPet = (data: PetType): Action => ({
  type: PetAction.Set,
  payload: data,
})

export const RemovePet = (): Action => ({
  type: PetAction.Remove,
  payload: {}
})

export function petReducer(_state: PetState, action: Action): PetState {
  const { type, payload } = action;
  switch (type) {
    case PetAction.Set:
      return {
        isLoading: false,
        pet: payload
      }
    case PetAction.Remove:
      return {
        isLoading: false,
        pet: {}
      }
    default:
      return {
        isLoading: false,
        pet: {}
      }
  }
}
