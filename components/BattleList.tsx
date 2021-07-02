import { APIRequest } from "../services/APIRequest"
import { APIImagePath } from "../services/Helpers"
import { usePet } from "../services/PetContext"
import { membersOnly } from "../services/TokenService"
import { UserPetType } from "../src/user/pet"
import paths from "../utils/Paths"
import Image from 'next/image'

interface BattleListProps {
  pets: UserPetType[]
}

const BattleList = (props: BattleListProps): JSX.Element => {
  // @ts-ignore: Fix this!
  const [currentPet, currentPetDispatch] = usePet()

  const handleClick = (pet: UserPetType): void => {
    APIRequest(paths.createUserPetBattle, "post", {
      user_pet_battle: {
        challenger_id: currentPet.pet.id,
        opponent_id: pet.id
      }
    })
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Pets to battle!</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {props.pets.map((pet: UserPetType) => {
            return (
              <div key={pet.id} onClick={() => handleClick(pet)} className="mouse-pointer bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{pet.attributes.name}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-spam-2">
                  <Image
                    width="64"
                    height="64"
                    src={APIImagePath(pet.attributes.image_url.path)}
                  />
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  membersOnly(context)
  return { props: {} }
}

export default BattleList
