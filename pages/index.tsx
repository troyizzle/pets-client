// @ts-nocheck
import Head from 'next/head'
import { useAuth } from "../services/AuthStateContext"
import Layout from '../components/Layout';
import { usePet } from '../services/PetContext';
import PetCreation from '../components/PetCreation';

export default function Home() {
  const [user, _dispatch] = useAuth();
  const [pet, _petDispatch] = usePet();

  return (
    <Layout>
      <Head>
        <title>Pets</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {(!pet['isLoading'] && !pet?.pet?.id) && (
        <PetCreation />
      )}
    </Layout>
  )
}
