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

export const apporveBUSD =async()=>{
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_BETSWAP_TOKEN);
    console.log('approve run')
    const result = await betContract.methods.approve(envdev.REACT_AAP_DONATION, 115792089237316195423570985008687907853269984665640564039457584007913129639935n).send({
        from: await getAccount(),
    });
    if(result.status == true){
        alert('Approved')
    }
    else{
        alert("Failded")
    }
    console.log("is approved", result)
    return result;
}

export const isapproved = async () => {
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_BETSWAP_TOKEN);
    const result = await betContract.methods.allowance(await getAccount(),envdev.REACT_AAP_DONATION).call()
    const name = await betContract.methods.name().call()
    console.log("contract",name)
    return result;
}