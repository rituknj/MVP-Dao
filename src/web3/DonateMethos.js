import { Donation } from "../Contract/Donation";
import { envdev } from "./environments";
import { getAccount, getContract } from './web3'
import { BETS_ABI } from '../Contract/BetsToken';
import BigInt from "big-integer";

export const donatefund =async(amount)=> {
    const contract = await getContract(Donation, envdev.REACT_AAP_DONATION);
    const convertedamount = BigInt(amount*10**18)
    const data = await contract.methods.donate(convertedamount.toString()).send({from: await getAccount()});
    return data;
}

export const getTotalFund =async(amount)=> {
    const contract = await getContract(Donation, envdev.REACT_AAP_DONATION);
    const data = await contract.methods.getTotalDonation().call();
    return data;
}

export const getBUSDBalance = async () => {
    const betContract =  await getContract(BETS_ABI, envdev.REACT_APP_BUSD_TOKEN);
    const _balance = await betContract.methods.balanceOf(await getAccount()).call();
    const  balanceofBET = _balance/10**18
    return (balanceofBET).toFixed(2);
}

export const apporveBUSD =async()=>{
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_BUSD_TOKEN);
    const result = await betContract.methods.approve(envdev.REACT_AAP_DONATION, 115792089237316195423570985008687907853269984665640564039457584007913129639935n).send({from: await getAccount(),});
    if(result.status == true){
        alert('Approved')
    }
    else{
        alert("Failded")
    }
    return result;
}

export const isapproved = async () => {
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_BUSD_TOKEN);
    const result = await betContract.methods.allowance(await getAccount(),envdev.REACT_AAP_DONATION).call()
    const name = await betContract.methods.name().call()
    console.log("contract",name)
    return result;
}