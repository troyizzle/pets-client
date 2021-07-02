import { APIImagePath } from "../../services/Helpers"
import { usePet } from "../../services/PetContext"
import { UserPetType } from "../../src/user/pet"
import AttackBar from "./AttackBar"
import HealthBar from "./HealthBar"
import Image from "next/image"

interface CardProps {
  pet: UserPetType
  opponent: UserPetType
  subscription: any
  petTurn: UserPetType | undefined
}

const Card = (props: CardProps): JSX.Element => {
  // @ts-ignore: Fix this!
  const [currentPet, currentPetDispatch] = usePet()

  return (
    <div className="space-y-4">
      <Image
        width="102"
        height="102"
        src={APIImagePath(props.pet?.attributes?.image_url?.path)}
      />
      <HealthBar pet={props.pet} />
      {(props?.petTurn?.id == props.pet.id && props.pet.id == currentPet.pet.id) && (
        <AttackBar pet={props?.pet} opponent={props?.opponent} subscription={props?.subscription} />
      )}
    </div>
  )
}

export default Card;
