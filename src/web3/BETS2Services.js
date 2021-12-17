import { getAccount, getContract } from "./web3";
import { BETS2 } from './../Contract/bets2';
import { envdev, envprod } from "./environments";
import { fromWei } from "./utils";
import { Form } from "react-bootstrap";

export const getBETContract = async () => {
    const betContract = getContract(BETS2, envprod.REACT_APP_BETS2_SMART_CONTRACT);
    return betContract;
}

export const getBETBalancebets = async () => {
    const betContract = await getBETContract();
    const address = await getAccount();
    const _balance = await betContract.methods.balanceOf(address).call();
    const  balanceofBET = _balance/10**18
    return balanceofBET
}

export const gettotalsupply = async () => {
    const betContract = getContract(BETS2, envprod.REACT_APP_BETS2_SMART_CONTRACT);
    const totalSupply = await betContract.methods.totalSupply().call()
    return totalSupply;
}

export const isapproved = async () => {
   
    const betContract = getContract(BETS2, envprod.REACT_APP_BETS2_SMART_CONTRACT);
    const result = await betContract.methods.allowance( await getAccount(),envprod.REACT_APP_BETS2_SMART_CONTRACT).call()
    return result;
}


export const approveBETS = async () => {
    const betContract = getContract(BETS2, envprod.REACT_APP_BET_SMART_CONTRACT);
  
    const result = await betContract.methods.approve(envprod.REACT_APP_BETS2_SMART_CONTRACT, 115792089237316195423570985008687907853269984665640564039457584007913129639935n).send({
        from: await getAccount(),
    });
    if(result.status == true){
        alert('Approved')
    }
    else{
        //pass
    }

    return result;
}

export const addBETS = async () => {
    await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
            type: "ERC20",
            options: {
                address: envprod.REACT_APP_BET_SMART_CONTRACT,
                symbol: 'BETS',
                decimals: 8,
            },
        },
    });
}