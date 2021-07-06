// @ts-nocheck
import Head from 'next/head'
import { useAuth } from "../services/AuthStateContext"
import Layout from '../components/Layout';
import { usePet } from '../services/PetContext';
import PetCreation from '../components/PetCreation';
import Card from '../components/pets/Card';

export default function Home() {
  const [user, _dispatch] = useAuth();
  const [pet, _petDispatch] = usePet();

  return (
    <Layout>
      <Head>
        <title>Pets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {(!pet['isLoading'] && !pet?.pet?.id) && (
        <PetCreation />
      )}
      {(!pet['isLoading'] && pet?.pet?.id) && (
        <Card pet={pet.pet} />
      )}
    </Layout>
  )
}
