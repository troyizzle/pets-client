import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { usePet } from '../../services/PetContext'
import { membersOnly } from '../../services/TokenService'
import { APIRequest } from '../../services/APIRequest'
import paths from '../../utils/Paths'
import { useAuth } from '../../services/AuthStateContext'
import { UserPetType } from '../../src/user/pet'
import BattleList from "../../components/BattleList"

const Battle = () => {
  // @ts-ignore: Fix this!
  const [pet, petDispatch] = usePet();
  // @ts-ignore: Fix this!
  const [user, userDispatch] = useAuth();
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: Change this API
    APIRequest(paths.userPets)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data
          const pets = data.filter((pet: UserPetType) => pet.attributes.user_id != user.id)
          setUserPets(pets)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (loading) {
    return (
      <div>Loading!!</div>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Battle</title>
      </Head>
      <div className="grid grid-cols-2">
        <BattleList pets={userPets} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  membersOnly(context);
  return { props: {} }
}

export default Battle;
