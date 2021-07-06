export interface PetFoodProps {
  id: string,
  type: string,
  attributes: {
    weight: number,
    value: number,
    rarity: number,
    hunger: number,
    picture_url: {
      name: string,
      path: string
    }
  }
}
