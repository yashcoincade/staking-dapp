import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
const Navbar = () => {
  return (
    <div className="flex m-1 justify-between">
        <img src="https://imgur.com/gi4BvGD.png" alt="Logo" className="w-[50px] h-[50px] object-contain" />
        <ConnectWallet accentColor='#5A866F' colorMode='light'/>
    </div>
  )
}

export default Navbar