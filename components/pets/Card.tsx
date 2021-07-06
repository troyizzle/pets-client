import { UserPetType } from "../../src/user/pet"
import Heading from "../Heading"
import { useEffect, useRef, useState } from "react"
import { Dialog } from "@headlessui/react"
import Modal from "./Modal"
import PetPicture from "./Picture"
import { BookOpenIcon, DatabaseIcon, HeartIcon, PlayIcon, RewindIcon, ShoppingBagIcon, XIcon } from "@heroicons/react/outline"
import { redirect } from "../../services/NavService"
import { APIRequest } from "../../services/APIRequest"
import paths from "../../utils/Paths"
import { UserPetFood, UserPetFoodData } from "../../src/user/pet/food"
import { APIImagePath } from "../../services/Helpers"
import _ from "lodash"

interface CardProps {
  pet: UserPetType
}

const Attributes = ({ name }: { name: string }): JSX.Element => {
  return (
    <div className="bg-gray-300 rounded-lg text-center font-semibold">
      {name}
    </div>
  )
}

interface ActionProps {
  name: string,
  icon: JSX.Element,
  onClick: any,
  setModalData?: (arg: JSX.Element | any) => void
}

const Action = ({ name, icon, onClick }: ActionProps): JSX.Element => {
  return (
    <button onClick={onClick} className="rounded w-20 border border-1 hover:bg-gray-100 shadow-lg py-2 px-3 h-24">
      <div>
        {icon}
      </div>
      <div>
        {name}
      </div>
    </button>
  )
}

const Card = ({ pet }: CardProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<JSX.Element>()

  useEffect(() => {
    setModalData(<InitialModalData />)
  }, [])

  useEffect(() => {
    if (isOpen) return;

    // Running this right away it was displaying the change before closing
    setTimeout(() => {
      setModalData(<InitialModalData />)
    }, 200)
  }, [isOpen])

  const closeModal = (): void => {
    setIsOpen(false)
  }

  const ModalFooter = ({ prevModal, children }: { prevModal: JSX.Element, children?: React.ReactNode }): JSX.Element => {
    return (
      <div className="flex items-center justify-between mt-4 h-10">
        <button
          onClick={() => { setModalData(prevModal) }}
          className="bg-yellow-200 rounded-lg shadow">
          <RewindIcon className="h-10 text-white" />
        </button>
        {children}
        <button
          onClick={() => closeModal()}
          className="bg-red-500 rounded-lg shadow">
          <XIcon className="h-10 text-white" />
        </button>
      </div>
    )
  }

  const ModalItemAction = ({ text, onClick }: { text: string, onClick?: any }): JSX.Element => {
    return (
      <button
        className="bg-green-300 text-semibold h-10 p-2 w-48 rounded-lg"
        onClick={onClick}
      >
        {text}
      </button>
    )
  }

  ModalFooter.Action = ModalItemAction

  const ModalHeader = ({ title }: { title: string }): JSX.Element => {
    return (
      <div className="bg-yellow-300 text-center text-xl p-2">
        {title}
      </div>
    )
  }

  const FoodItemModal = ({ food }: { food: UserPetFood }): JSX.Element => {
    return (
      <>
        <ModalHeader title="Apple" />
        <pre>{JSON.stringify(food)}</pre>
        <ModalFooter prevModal={<FoodModal />}>
          <ModalFooter.Action text="Feed pet" />
        </ModalFooter>
      </>
    )
  }

  const FoodModal = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true)
    const [food, setFood] = useState<UserPetFoodData>();

    useEffect(() => {
      APIRequest(paths.myPetFood).then((res) => {
        if (res.status === 200) {
          setFood(res.data)
        }
        setLoading(false)
      })
        .catch((err) => {
          console.log(err)
        })
    }, [])

    return (
      <>
        <ModalHeader title={`Feed ${pet.attributes.name}`} />
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            <div className="bg-gray-100">
              <div className="text-center font-semibold">
                Food left: {food?.data?.length}
              </div>
            </div >
            {_.chunk(food?.data, 4).map((chunk, index) => (
              <div
                key={index}
                className="flex flex-row p-2 justify-between"
              >
                {chunk.map((f) => (
                  <div
                    key={f.id}
                    className="border shadow-sm rounded">
                    <button onClick={() => setModalData(<FoodItemModal food={f} />)}>
                      <img
                        className="h-14 p-2"
                        src={APIImagePath(food?.included[0].attributes.picture_url.path)}
                      />
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        <ModalFooter prevModal={<InitialModalData />} />
      </>
    )
  }

  const InitialModalData = (): JSX.Element => {
    // Use imagesinsteadof icons???
    const Actions: ActionProps[] = [
      {
        name: "Battle",
        icon: <ShoppingBagIcon className="h-6" />,
        onClick: () => {
          if (confirm("This will redirect you to the battles page")) {
            redirect("/battles")
          }
        }
      },
      {
        name: "Read",
        icon: <BookOpenIcon className="h-6" />,
        onClick: () => console.log("read")
      },
      {
        name: "Feed",
        icon: <DatabaseIcon className="h-6" />,
        onClick: () => setModalData(<FoodModal />)
      },
      {
        name: "Play",
        icon: <PlayIcon className="h-6" />,
        onClick: () => console.log("play")
      }
    ]

    return (
      <>
        <Dialog.Title className="text-center bg-yellow-300 p-2 font-bold">
          {pet.attributes.name}
        </Dialog.Title>
        <div className="mt-2">
          <div className="grid grid-cols-3">
            <div>
              <PetPicture pet={pet} size="SMALL" />
            </div>
            <div className="space-y-2">
              {["Species", "Colour", "Gender"].map((name) => <Attributes key={name} name={name} />)}
            </div>
            <div className="space-y-2">
              {pet.attributes.attack}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-2 mt-2">
          <div className="flex items-center">
            <HeartIcon className="text-red-700 h-6" />
            <div className="bg-green-500 rounded-lg shadow w-24">
              <div className="text-center font-semibold">
                {pet.attributes.health}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-between">
            {Actions.map((action) => <Action key={action.name} {...action} />)}
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-red-300">
              <span className="text-white text-2xl">X</span>
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-96 p-8">
          <div onClick={() => setIsOpen(true)} className="bg-yellow-300 rounded hover:bg-yellow-200 py-1 text-center">
            <Heading type="h1" text={pet.attributes.name} />
          </div>
          <div>
            <PetPicture pet={pet} size="LARGE" />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {modalData}
      </Modal>
    </>
  )
}

export default Card;
