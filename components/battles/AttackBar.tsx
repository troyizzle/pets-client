import { UserPetType } from "../../src/user/pet"
import Button from "../Button"

interface AttackBarProps {
  pet: UserPetType,
  opponent: UserPetType,
  subscription: any,
}


const AttackBar = (props: AttackBarProps): JSX.Element => {
  const handleAttack = (damage: number): void => {
    props.subscription.send({
      attacker_id: props.pet.id,
      attackee_id: props.opponent.id,
      damage: damage,
      weapon: 0
    })
  }


  return (
    <div>
      {props.pet.attributes.name === "gizmo" && (
        <Button type="submit" label="Buzoookah" disabled={false} onClick={() => handleAttack(100)} />
      )}
      <Button type="submit" label="Attack" disabled={false} onClick={() => handleAttack(1)} />
    </div>
  )
}

export default AttackBar
