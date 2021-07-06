import clsx from "clsx";
import { APIImagePath } from "../../services/Helpers";
import { UserPetType } from "../../src/user/pet";

interface Props {
  pet: UserPetType,
  size: "SMALL" | "MEDIUM" | "LARGE"
}

const PetPicture = ({ pet, size }: Props): JSX.Element => {
  return (
    <img
      src={APIImagePath(pet.attributes.image_url.path)}
      className={clsx(
        size === "SMALL" ? "h-24" : "",
        size === "LARGE" ? "h-64" : "",
      )}
    />
  )
}

export default PetPicture
