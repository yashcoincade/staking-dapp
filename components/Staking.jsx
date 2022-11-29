import React,{useState} from 'react'
import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { BeatLoader } from 'react-spinners';
import toast from "react-hot-toast";
import {ethers,BigNumber} from "ethers";

const Staking = () => {
    const [stakeAmount, setStakeAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);

    const address = useAddress();
    const { contract } = useContract("0xAD53b44FC9bEf5507F6Ba2ac5010cB63B624B306");
    const { contract: tokenContract } = useContract("0xa51001ef0dC900D39425Fa15B126Da10E5926886");
    const { data: earned, isLoading: earnedLoading } = useContractRead(contract, "earned", address)
    const { data: getStaked, isLoading: getStakedLoading } = useContractRead(contract, "getStaked", address)
    const { data: balanceOf, isLoading: balanceOfLoading } = useContractRead(tokenContract, "balanceOf", address)
    const { data:rewardsPerToken, isLoading:rewardsPerTokenLoading } = useContractRead(contract, "s_rewardPerTokenStored")

    const { mutateAsync: stake } = useContractWrite(contract, "stake")
    const { mutateAsync: withdraw } = useContractWrite(contract, "withdraw")
    const { mutateAsync: claimReward } = useContractWrite(contract, "claimReward")
    const { mutateAsync: increaseAllowance } = useContractWrite(tokenContract, "increaseAllowance")

    const stakeTokens = async () => {
        const notification = toast.loading("Staking Cade...");
        try {
            const allowancedata = await increaseAllowance([ "0xAD53b44FC9bEf5507F6Ba2ac5010cB63B624B306", ethers.utils.parseEther(stakeAmount) ]);
            console.info("contract call successs", allowancedata);
            const data = await stake([ ethers.utils.parseEther(stakeAmount)]);
            console.info("contract call successs", data);
            toast.success("Cade Staked successfully!", {
                id: notification,
              });
          } catch (err) {
            toast.error(err.reason, {
                id: notification,
              });
            console.error("contract call failure", err);
          }
    }

    const withdrawTokens = async () => {
        const notification = toast.loading("Withdrawing Cade...");
        try {
            const data = await withdraw([ (ethers.utils.parseEther(withdrawAmount)).toString()]);
            console.info("contract call successs", data);
            toast.success("Cade Withdrawn successfully!", {
                id: notification,
              });
          } catch (err) {
            toast.error(err.reason, {
                id: notification,
              });
            console.error("contract call failure", err);
          }
    }

    const claimEarnedTokens = async () => {
        const notification = toast.loading("Claiming Cade Rewards...");
        try {
            const data = await claimReward([]);
            console.info("contract call successs", data);
            toast.success("Rewards Claimed successfully!", {
                id: notification,
              });
          } catch (err) {
            toast.error(err.reason, {
                id: notification,
              });
            console.error("contract call failure", err);
          }
    }


    return (
        <div className="flex flex-col justify-center items-center mt-5">
            <h1 className="text-3xl font-bold underline mb-5">Staking Platform</h1>
            <div className="bg-gradient-to-r from-emerald-900 to-green-900 w-[1000px] rounded-xl p-5 ">
                <div className="flex p-2 justify-between">
                    <img src="https://imgur.com/viVcTZ5.png" alt="coinlogo" className="w-[50px] h-[50px] object-contain pl-2" />
                    <p className="text-4xl font-bold ml-20 text-emerald-300 animate-pulse">{rewardsPerTokenLoading ? <BeatLoader color="white" /> : (rewardsPerToken * 100).toString()}% APR</p>
                    <button className="text-xl font-bold flex items-center p-1 bg-emerald-500 rounded-md text-black hover:bg-[#32706F]"
                    onClick={claimEarnedTokens} >Claim Rewards</button>
                </div>

                <div className="flex justify-between mt-10">
                    <p className="font-extralight ml-3 text-emerald-200">Your Deposit</p>
                    <p className="font-extralight text-emerald-200">Cade in Your Wallet</p>
                    <p className="font-extralight mr-3 text-emerald-200">Your Earnings</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-2xl font-bold ml-3">
                        {getStakedLoading ? <BeatLoader color="white" /> : (getStaked/(1*10**18)).toString()} Cade
                        </p>
                    <p className="text-2xl font-bold">
                        {balanceOfLoading ? <BeatLoader color="white" /> : (balanceOf/(1*10**18)).toString()} Cade
                    </p>
                    <p className="text-2xl font-bold mr-3">
                        {earnedLoading ? <BeatLoader color="white" /> : (ethers.utils.formatEther(earned)).toString()} Cade
                    </p>
                </div>

                <div className="flex justify-between mt-10">
                    <div className="flex mt-3">
                        <input type="number" className="bg-[#32706F] ml-1 rounded-md text-bold"  onChange={(e)=>{setWithdrawAmount(e.target.value)}}/>
                        <button className="text-2xl font-semibold ml-2 bg-[#32706F] p-1 rounded-md hover:bg-emerald-500"
                        onClick={withdrawTokens}
                        >Withdraw</button>
                    </div>
                    <div className="flex mt-3">
                        <input type="number" className="bg-[#32706F] mr-2 rounded-md text-bold" onChange={(e)=>{setStakeAmount(e.target.value)}}/>
                        <button className="text-2xl font-semibold mr-1 bg-[#32706F] p-1 rounded-md hover:bg-emerald-500"
                        onClick={stakeTokens}
                        >Stake</button> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Staking