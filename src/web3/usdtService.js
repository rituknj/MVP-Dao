
import { envdev } from './environments';
import { BETS2 } from './../Contract/bets2';
import { BETS_ABI } from './../Contract/BetswampMVP';
import { getContract, getAccount } from './web3';
import { toUrl, fromWei } from './utils';

import usdtImage from './../images/Binance USD (BUSD).svg';

export const getUSDTContract = async () => {
    const usdtContract = await getContract(BETS2, envdev.REACT_APP_USDT_SMART_CONTRACT);
    console.log('usdtcontract')
    return usdtContract;
}

export const getMVPContract = async () => {
    const usdtContract = await getContract(BETS2, envdev.REACT_APP_BETSWAMP_MVP_CONTRACT);
    return usdtContract;
}

export const getUSDTBalance = async () => {
    const usdtContract = await getUSDTContract();
    const address = await getAccount();
    const _balance = await usdtContract.methods.balanceOf(address).call();
    const  balanceofUSDT = fromWei(_balance, 'ether')
    return balanceofUSDT
}

export const addUSDT = async () => {
    await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
            type: "ERC20",
            options: {
                address: envdev.REACT_APP_USDT_SMART_CONTRACT,
                symbol: 'BUSD',
                decimals: 18,
                image: toUrl(usdtImage),
            },
        },
    });
}