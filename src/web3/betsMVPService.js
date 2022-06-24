import { getAccount, getContract, ToWei } from "./web3";
import {TotalEventsCount, updatingeventdata} from './Countallevents'
import { BETS_ABI } from './../Contract/BetswampMVP';
import { MVPBetsV2 } from "../Contract/BetingContractV2";
import { envdev } from "./environments";
import BigInt from "big-integer";
import { approveBUSD, isapproved } from "./betsService";
import { strTimeToInt, fromWei } from './utils';
import { Points } from "../Contract/Points";


export const getBETMVPContract = async () => {
    const betMVPContract = getContract(
        BETS_ABI, 
        envdev.REACT_APP_BETSWAMP_MVP_CONTRACT);
    return betMVPContract;
}

export const addSubbCategory = async (sub_category) => {
    // const betMVPContract = await getBETMVPContract();
    // var getData = await betMVPContract.methods.addSubbCategory('0x0', sub_category);
    // let data = getData.encodeABI()
    // let res = await web3Instance.eth.sendTransaction({to: envdev.REACT_APP_BETSWAMP_MVP_CONTRACT, from: await getAccount(), data: data})
    // return res
}

export const removeSubCategory = async (sub_category) => {
    // const betMVPContract = await getBETMVPContract();
    // const result = await betMVPContract.methods.removeSubCategory('0x0', sub_category).call();
    // return result;
}

export const getSubCategory = async (id) => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const subCategories = await betMVPContract.methods.getSubCategory(id).call();
    return subCategories;
}


export const createEvent = async (sub_category, description, url, name, time, endTime, event1, event2 ) => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    console.log(sub_category, description, url, name, time, endTime, event1, event2)
    var getData = await betMVPContract.methods.createEvent('0x0', sub_category, name, description, url, time, endTime, event1, event2).send({
        from: await getAccount(),
    });
    return getData;
}

export const placeBet = async(event_id, occured, amount) => {
    var getData
    let maxamount = await isapproved()
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const a = await ToWei(amount)
    console.log("maxapprove", maxamount,a,Number(a) < Number(maxamount))

    if(Number(a) < Number(maxamount)){
        getData = await betMVPContract.methods.placeBet(event_id, a, occured).send({
            from: await getAccount(),
        });
        return getData
    }
    else{
        let approve = await approveBUSD();
        if(approve.status == true){
            getData = await betMVPContract.methods.placeBet(event_id, a, occured).send({
                from: await getAccount(),
            });
            return getData
        }
    }
    return getData
}

export const validateEvent = async (event_id, occured) => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    console.log("validate event", event_id, occured)
    var getData = await betMVPContract.methods.validateEvent(event_id, occured).send({
        from: await getAccount(),
    });
    if(getData.status == true){
        alert('Validated successfully')
    }
}

export const getValidationPoint = async () => {
    const betMVPContract = await getContract(Points, envdev.REACT_AAP_POINTS);
    const validationPoint = await betMVPContract.methods.showValidationPoints(await getAccount()).call();
    const  _validationPoint = validationPoint
    return _validationPoint;
}

export const CreatorReward = async (id) =>{
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const betsHistory = await betMVPContract.methods.getCreatorRewardOnEvent(await getAccount(),id).call();
    return betsHistory;
}

export const UserEventHistory = async () =>{
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const betsHistory = await betMVPContract.methods.getUserEventHistory(await getAccount()).call();
    return betsHistory;
}

export const BoostEvent = async (id) =>{
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const betsHistory = await betMVPContract.methods.boostEvent('5000000000000000000', id).send({'from': await getAccount()});
    return betsHistory;
}

export const getActiveEvents = async () => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const activeEvents = await betMVPContract.methods.getActiveEvents().call();
    return activeEvents;
}

export const getValidatedEvents = async () => {
    // const betMVPContract = await getBETMVPContract();
    // const validatedEvents = await betMVPContract.methods.getValidatedEvents().call();
    // return validatedEvents;
}

export const totalEvents = async () => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const totalEvents = await betMVPContract.methods.totalEvents().call();
    return totalEvents;
}


export const getOccurrenceBetCount = async (eventID, occured) => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const occurrenceBetCount = await betMVPContract.methods.getOccurrenceBetCount(eventID, occured).call();
    return occurrenceBetCount;
}
export const getEventOccurrenceBetAmount = async (eventID, occured) => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const eventOccurrenceBetAmount = await betMVPContract.methods.getEventOccurrenceBetAmount(eventID, occured).call();
    return eventOccurrenceBetAmount;
}

export const getEvent = async (eventID) => {
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const eventOccurrenceBetAmount = await betMVPContract.methods.getEvent(eventID).call();
    return eventOccurrenceBetAmount;
}

export const earnvalidationpoints = async (amount) => {
    const a = await ToWei(amount)
    const betMVPContract = await getContract(Points, envdev.REACT_AAP_POINTS);
    const points = await betMVPContract.methods.earnValidationPoints(a).send({
        from: await getAccount(),
    
    });
    return points;
}

export const revokevalidationpointsearning = async () => {
    const betMVPContract = await getContract(Points, envdev.REACT_AAP_POINTS);
    const earnedpoints = await betMVPContract.methods.revokeValidationPointsEarning().send({
        from: await getAccount(),
        
    });
    return earnedpoints;
}

export const claimpoints = async () => {
    const betMVPContract = await getContract(Points, envdev.REACT_AAP_POINTS);
    const earnedpoints = await betMVPContract.methods.claimValidationPoint().send({
        from: await getAccount(),   
    });;
    return earnedpoints;
}

export const totaltokenlocked = async () => {
    const betMVPContract = await getContract(Points, envdev.REACT_AAP_POINTS);
    const earnedpoints = await betMVPContract.methods.userCurrentlyLockedBETS( await getAccount() ).call();
    return earnedpoints;
}

export const getusertotalwinnings = async () => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const earnedpoints = await betMVPContract.methods.getUserTotalWinnings( await getAccount() ).call();
    return earnedpoints;
}

export const gettotaluserwageramount = async () => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const earnedpoints = await betMVPContract.methods.getTotalUserWagerAmount( await getAccount() ).call();
    return earnedpoints;
}

export const claimrewards = async (id) => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.claimReward(id).send({
        from: await getAccount(),
        
    });
    if(resutl.status == true){
        alert("Claimed Successfully")
    }
    else{
        alert("Failed")
    }
    return resutl;
}

export const reclaimwager = async (id) => {
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.reclaimWager(id).send({
        from: await getAccount(),      
    });
    return resutl;
}

export const bettorscounts = async (id, occured) => {
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    let result = await betMVPContract.methods.getOccurrenceBetCount(id, occured).call();
    return result
}

export const bettorscountspercent = async (id, occured,bettcont) => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const bettes = await (betMVPContract.methods.getOccurrenceBetCount(id, occured).call())/bettcont*100
    return bettes
}

export const AmountStackOnEventByaUser = async (id) => {
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.getUserEventWager(id, await getAccount() ).call();
    return resutl;
}

export const GetUserWonAmountOnEvent = async (id) => {
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.getUserEventWon(id, await getAccount() ).call();
    return resutl;
}

export const pendingpoint = async () => {
    const betMVPContract = await getContract(Points, envdev.REACT_AAP_POINTS);
    const resutl = await betMVPContract.methods.getUserPendingPoints(await getAccount()).call();
    return Number(resutl)
}
export const cancelevent = async (id) => {
    // const betMVPContract = await getBETMVPContract();
    // const resutl = await betMVPContract.methods.cancelEvent(id).send({
    //     from: await getAccount(),      
    // });
    // if(resutl.status == true){
    //     alert("Event Canceled")
    //     await TotalEventsCount();
    //     window.location.reload(false);

    // }
    // else{
    //     alert("Failed")
    // }
    // return resutl
}

export const allactiveusers = async () => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.getActiveUsersList().call();
    return resutl
}

export const totalpayout = async () => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.getTotalPayout().call();
    return resutl
}

export const activeuserslist = async () => {
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.getActiveUsersList().call();
    return resutl
}
export const counttotalbetscreated = async (address) =>{
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const betsHistory = await betMVPContract.methods.getUserEventHistory(address).call({'from': await getAccount()});
    return betsHistory;
}

export const pausebet = async (time) =>{
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const betsHistory = await betMVPContract.methods.pauseBet(time).send({'from': await getAccount()});
    return betsHistory;
}
export const Unpausebet = async () =>{
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const betsHistory = await betMVPContract.methods.unpauseBet().send({'from': await getAccount()});
    return betsHistory;
}

export const Ispausebet = async () =>{
    const betMVPContract = await getContract(MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const betsHistory = await betMVPContract.methods.isBetPaused(await getAccount()).call();
    return betsHistory;
}

export const totalbetcreated = async() => {
    let users = await activeuserslist();
    let history = []
    let createbets = 0
    
    for(const m of users){
        history = await counttotalbetscreated(m);
        createbets = createbets + history.length
    }
    console.log("created bets are", createbets)
    return createbets
}

export const getUserWonAmount = async (id, address) => {
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.getUserEventWon(id, address).call();
    return resutl;
}

export const userBethistory = async (id, address) => {
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.getUserBetHistory(await getAccount()).call();
    return resutl;
}

export const getvalidatorHistory = async()=>{
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.validatorHistory(await getAccount()).call();
    return resutl;
}

export const validatorsRewardOnEvnet = async(id)=>{
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.getValidatorRewardOnEvent(await getAccount(),id).call();
    return resutl;
}

export const getvalidatorsRewardOnEvnet = async(id)=>{
    const betMVPContract = await getContract( MVPBetsV2, envdev.REACT_APP_BET_BETSWAMP_V2);
    const resutl = await betMVPContract.methods.getValidatorRewardOnEvent(await getAccount(),id).call();
    return resutl;
}

export const getTotalValidatorRewardEarned = async()=>{
    let reward = 0;
    const ids = await getvalidatorHistory();
    for(let i = 0; i < ids.length; i++){
        const x = await validatorsRewardOnEvnet(ids[i])
        reward = reward + Number(x)
        console.log("validation reward and events",ids[i],reward)
    }
    // ids.forEach(async(ele)=>{
    //     const i = await validatorsRewardOnEvnet(ele)
    //     reward = reward + Number(i)
    //     console.log("validation reward and events",ele,i,reward)
    // })
    return reward;
}

export const totalAmountWon =async()=>{
    let wonamount = 0 
    const eventsid = await userBethistory();
    for(let i = 0; i < eventsid.length; i++){
        const won = await GetUserWonAmountOnEvent(eventsid[i]);
        wonamount = wonamount + Number(won)
        console.log("total amount won on all evnets",wonamount)
    }
    return wonamount;
}