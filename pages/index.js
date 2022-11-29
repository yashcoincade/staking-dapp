import Head from 'next/head'
import Navbar from '../components/Navbar'
import Staking from '../components/Staking'
import { useAddress } from "@thirdweb-dev/react";
import Login from '../components/Login';

export default function Home() {
  const address = useAddress();
  return (
    <div className="">
      <Head>
        <title>Staking dApp</title>
        <meta name="description" content="This is a Staking dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      {
        address ? <Staking /> : <Login />
      }
      
      
    </div>
  )
}
