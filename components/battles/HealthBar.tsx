import { UserPetType } from "../../src/user/pet";
import { CakeIcon, FireIcon, HeartIcon } from "@heroicons/react/outline"

interface HealthBarProps {
  pet: UserPetType
}

const HealthBar = (props: HealthBarProps): JSX.Element => {
  return (
    <div className="bg-gray-100 rounded flex items-center px-6 w-48 space-x-4">
      <span className="flex items-center">
        {props?.pet?.attributes?.health}
        <HeartIcon className="text-pink-400 h-6" />
      </span>
      <div className="flex items-center">
        {props?.pet?.attributes?.attack}
        <FireIcon className="text-red-400 h-6" />
      </div>
      {
        // TODO: Cake icon doesn't seem to good and don't even know if should
        // show hunger
      }
      <div className="flex items-center">
        {props?.pet?.attributes?.hunger}
        <CakeIcon className="text-yellow-400 h-6" />
      </div>
    </div>
  )
}

export default HealthBar;
