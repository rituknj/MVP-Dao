import { getAccount, getContract } from "./web3";
import { BETS_ABI } from './../Contract/Bets';
import { envdev } from "./environments";
import { fromWei } from "./utils";
import { Form } from "react-bootstrap";

export const getBETContract = async () => {
    const betContract = getContract(BETS_ABI, envdev.REACT_APP_BET_SMART_CONTRACT);
    return betContract;
}

export const getBETBalance = async () => {
    const betContract = await getBETContract();
    const address = await getAccount();
    const _balance = await betContract.methods.balanceOf(address).call();
    const  balanceofBET = fromWei(_balance, 'custom')
    return balanceofBET
}

export const gettotalsupply = async () => {
    const betContract = getContract(BETS_ABI, envdev.REACT_APP_BET_SMART_CONTRACT);
    const totalSupply = await betContract.methods.totalSupply().call()
    return totalSupply;
}

export const isapproved = async () => {
    const betContract = getContract(BETS_ABI, envdev.REACT_APP_BET_SMART_CONTRACT);
    const result = await betContract.methods.allowance( await getAccount(),"0xB7FAc7003C2aD86Cb93d0d64dcf23456f6adE8bf").call()
    return result;
}


export const approve = async () => {
    let address = "0x2BcE2Ba5D801D9c6C90Ee137Ec3b50AEf6cc1085"
    const betContract = getContract(BETS_ABI, envdev.REACT_APP_BET_SMART_CONTRACT);
    console.log('approve run')
    const result = await betContract.methods.approve('0xB7FAc7003C2aD86Cb93d0d64dcf23456f6adE8bf',115792089237316195423570985008687907853269984665640564039457584007913129639935n).send({
        from: await getAccount(),
    });
    console.log("is approved", result)
    return result;
}

export const addBETS = async () => {
    await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
            type: "ERC20",
            options: {
                address: envdev.REACT_APP_BET_SMART_CONTRACT,
                symbol: 'BETS',
                decimals: 8,
            },
        },
    });
}