import { PetFoodProps } from "../../../pet/food";

export interface UserPetFoodData {
  data: UserPetFood[],
  included: PetFoodProps[]
}

export interface UserPetFood {
  id: string,
  type: string,
  relationships: {
    food: {
      data: {
        id: string,
        type: string
      }
    }
  }
}
