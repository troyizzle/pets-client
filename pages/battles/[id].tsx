import Head from "next/head"
import Layout from "../../components/Layout"
import { useRouter } from "next/router"
import { UserPetBattleProvider } from "../../src/user/pet/battle"
import Battle from "../../components/Battle"

const Battles = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>Battling!!</title>
      </Head>
      <Layout>
        <UserPetBattleProvider>
          <Battle id={id} />
        </UserPetBattleProvider>
      </Layout>
    </>
  )
}

export default Battles
