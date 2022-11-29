import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-5">
            <h1 className="text-3xl font-bold underline mb-5">Staking Platform</h1>
            <div className="bg-gradient-to-r from-emerald-900 to-green-900 w-[1000px] rounded-xl p-5 flex flex-col justify-center items-center">
                <p className="text-center text-2xl font-bold animate-pulse">Connect your Wallet to Access the staking dashboard</p>
                <div className="w-[200px] mt-5">
                <ConnectWallet accentColor='#5A866F' colorMode='light'/>
                </div>
            </div>
        </div>
  )
}

export default Login