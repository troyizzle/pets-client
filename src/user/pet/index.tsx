export interface UserPetType {
  id: string,
  type: string,
  attributes: {
    name: string,
    health: number,
    attack: number,
    hunger: number,
    user_id: number
    image_url: {
      name: string,
      path: string
    }
  }
}
