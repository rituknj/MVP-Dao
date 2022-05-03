import { Donation } from "../Contract/Donation";
import { envdev } from "./environments";
import { getAccount, getContract } from './web3'

export const donatefund =async(amount)=> {
    const contract = await getContract(Donation, envdev.REACT_AAP_DONATION);
    const data = await contract.methods.donate(amount*10**18).send({from: await getAccount()});
    return data;
}