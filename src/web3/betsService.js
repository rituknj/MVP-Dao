import { getAccount, getContract } from "./web3";
import { BETS_ABI } from '../Contract/BetsToken';
import { envdev, envprod } from "./environments";
import { fromWei } from "./utils";
import { Form } from "react-bootstrap";

export const getBETContract = async () => {
    const betContract = getContract(BETS_ABI, envdev.REACT_APP_BETSWAP_TOKEN);
    return betContract;
}

export const getBETBalanceBUSD = async () => {
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_BETSWAP_TOKEN);
    const _balance = await betContract.methods.balanceOf(await getAccount()).call();
    const  balanceofBET = _balance/10**18
    return (balanceofBET).toFixed(2)
}
export const getBUSDBalance = async () => {
    const betContract =  await getContract(BETS_ABI, envdev.REACT_APP_BUSD_TOKEN);
    const _balance = await betContract.methods.balanceOf(await getAccount()).call();
    const  balanceofBET = _balance/10**18
    return (balanceofBET).toFixed(2)
}
export const getBETSV2Balance = async () => {
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_BETSWAP_TOKEN);
    const _balance = await betContract.methods.balanceOf(await getAccount()).call();
    const  balanceofBET = _balance/10**18
    return (balanceofBET).toFixed(2)
}

export const gettotalsupply = async () => {
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_BETSWAP_TOKEN);
    const totalSupply = await betContract.methods.totalSupply().call()
    return totalSupply;
}

export const isapproved = async () => {
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_BETSWAP_TOKEN);
    const result = await betContract.methods.allowance( await getAccount(),envdev.REACT_APP_BET_BETSWAMP_V2).call()
    const name = await betContract.methods.name().call()
    console.log("contract",name)
    return result;
}


export const approveBUSD = async () => {
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_BETSWAP_TOKEN);
    console.log('approve run')
    const result = await betContract.methods.approve(envdev.REACT_APP_BET_BETSWAMP_V2, 115792089237316195423570985008687907853269984665640564039457584007913129639935n).send({
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

export const addBETS = async () => {
    await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
            type: "ERC20",
            options: {
                address: envdev.REACT_APP_BUSD_TOKEN,
                symbol: 'BETS',
                decimals: 8,
            },
        },
    });
}

export const approvePoints = async () => {
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_SBETS);
    console.log('approve run')
    const result = await betContract.methods.approve(envdev.REACT_AAP_POINTS, 115792089237316195423570985008687907853269984665640564039457584007913129639935n).send({
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

export const isPointSapproved = async () => {
    const betContract = await getContract(BETS_ABI, envdev.REACT_APP_SBETS);
    const result = await betContract.methods.allowance(await getAccount(),envdev.REACT_AAP_POINTS).call()
    const name = await betContract.methods.name().call()
    console.log("contract",name)
    return result;
}