import { getAccount, getContract, web3Instance } from "./web3";
import {TotalEventsCount, updatingeventdata} from './Countallevents'
import { BETS_ABI } from './../Contract/BetswampMVP';
import { envdev } from "./environments";
import BigInt from "big-integer";
import { approve, isapproved } from "./betsService";
import { strTimeToInt, fromWei } from './utils';
import { get } from "jquery";


export const getBETMVPContract = async () => {
    const betMVPContract = getContract(
        BETS_ABI, 
        envdev.REACT_APP_BETSWAMP_MVP_CONTRACT);
    return betMVPContract;
}

export const addSubbCategory = async (sub_category) => {
    const betMVPContract = await getBETMVPContract();
    var getData = await betMVPContract.methods.addSubbCategory('0x0', sub_category);
    let data = getData.encodeABI()
    let res = await web3Instance.eth.sendTransaction({to: envdev.REACT_APP_BETSWAMP_MVP_CONTRACT, from: await getAccount(), data: data})
    return res
}

export const removeSubCategory = async (sub_category) => {
    const betMVPContract = await getBETMVPContract();
    const result = await betMVPContract.methods.removeSubCategory('0x0', sub_category).call();
    return result;
}

export const getSubCategory = async () => {
    const betMVPContract = await getBETMVPContract();
    const subCategories = await betMVPContract.methods.getSubCategory('0x0').call();
    return subCategories;
}

export const createEvent = async ({sub_category, name, time, endTime, event1, event2 }) => {
    const betMVPContract = await getBETMVPContract();
    // let time = strTimeToInt(Event.time);
    // let endTime = strTimeToInt(Event.endTime);
    // console.log("lengh",sub_category, name, time, endTime, event1, event2)
    var getData = await betMVPContract.methods.createEvent('0x0', sub_category, name, time, endTime, event1, event2).send({
        from: await getAccount(),
    });
    if(getData.status == true){
        alert('Event created successfully')
    }
    else{
        alert("Failed")
    }
    // let data = getData.encodeABI()
    // return await web3Instance.eth.sendTransaction({to: envdev.REACT_APP_BETSWAMP_MVP_CONTRACT, from: await getAccount(), data: data});
}

export const placeBet = async ({event_id, amount, occured}) => {
    var getData
    let maxamount = await isapproved()
    const betMVPContract = await getBETMVPContract();
    amount = BigInt(amount*10**18)
    // console.log("length ",event_id, amount.value, occured)
    if(amount.value < maxamount){
        getData = await betMVPContract.methods.placeBet(event_id, amount.value, occured).send({
            from: await getAccount(),
        });
    }
    else{
        alert("Please approve yourself for this much amount")
    }
    console.log('get data is ', getData)
    if(getData.status == true){
        alert('Bet placed successfully')
        await TotalEventsCount();
        
    }
    else{
        alert("Failed")
    }
}

export const validateEvent = async (event_id, occured) => {
    const betMVPContract = await getBETMVPContract();
    // console.log("events", event_id, occured)
    var getData = await betMVPContract.methods.validateEvent(event_id, occured).send({
        from: await getAccount(),
    });
    if(getData.status == true){
        alert('Validated successfully')
    }
}
export const getValidationPoint = async () => {
    const betMVPContract = await getBETMVPContract();
    const validationPoint = await betMVPContract.methods.showValidationPoints(await getAccount()).call();
    const  _validationPoint = validationPoint
    return _validationPoint/10**9;
}

export const getBetsHistory = async () =>{
    const betMVPContract = await getBETMVPContract();
    const betsHistory = await betMVPContract.methods.getUserEventHistory(await getAccount()).call({'from': await getAccount()});
    return betsHistory;
}

export const getActiveEvents = async () => {
    const betMVPContract = await getBETMVPContract();
    const activeEvents = await betMVPContract.methods.getActiveEvents().call();
    return activeEvents;
}

export const getValidatedEvents = async () => {
    const betMVPContract = await getBETMVPContract();
    const validatedEvents = await betMVPContract.methods.getValidatedEvents().call();
    return validatedEvents;
}

export const totalEvents = async () => {
    const betMVPContract = await getBETMVPContract();
    const totalEvents = await betMVPContract.methods.totalEvents().call();
    return totalEvents;
}


export const getOccurrenceBetCount = async (eventID, occured) => {
    const betMVPContract = await getBETMVPContract();
    const occurrenceBetCount = await betMVPContract.methods.getOccurrenceBetCount(eventID, occured).call();
    return occurrenceBetCount;
}
export const getEventOccurrenceBetAmount = async (eventID, occured) => {
    const betMVPContract = await getBETMVPContract();
    const eventOccurrenceBetAmount = await betMVPContract.methods.getEventOccurrenceBetAmount(eventID, occured).call();
    return eventOccurrenceBetAmount;
}

export const getEvent = async (eventID) => {
    const betMVPContract = await getBETMVPContract();
    const eventOccurrenceBetAmount = await betMVPContract.methods.getEvent(eventID).call();
    return eventOccurrenceBetAmount;
}

export const earnvalidationpoints = async (amount) => {
    // console.log("values of big number",amount)
    const betMVPContract = await getBETMVPContract();
    const points = await betMVPContract.methods.earnValidationPoints(amount).send({
        from: await getAccount(),
    
    });
    if(points.status == true){
        alert("Locked successfully")
    }
    else{
        alert("Failed")
    }
    console.log('locked amount', points)
    return points;
}

export const revokevalidationpointsearning = async () => {
    const betMVPContract = await getBETMVPContract();
    const earnedpoints = await betMVPContract.methods.revokeValidationPointsEarning().send({
        from: await getAccount(),
        
    });
    if(earnedpoints.status == true){
        alert("Unlocked successfully")
    }
    else{
        alert("Failed")
    }
    return earnedpoints;
}

export const claimpoints = async () => {
    const betMVPContract = await getBETMVPContract();
    const earnedpoints = await betMVPContract.methods.claimValidationPoint().send({
        from: await getAccount(),   
    });;
    if(earnedpoints.status == true){
        alert("Claimed Successfully")
    }
    else{
        alert("Failed")
    }
    return earnedpoints;
}

export const totaltokenlocked = async () => {
    const betMVPContract = await getBETMVPContract();
    const earnedpoints = await betMVPContract.methods.userCurrentlyLockedBETS( await getAccount() ).call();
    return earnedpoints;
}

export const getusertotalwinnings = async () => {
    const betMVPContract = await getBETMVPContract();
    const earnedpoints = await betMVPContract.methods.getUserTotalWinnings( await getAccount() ).call();
    return earnedpoints;
}

export const gettotaluserwageramount = async () => {
    const betMVPContract = await getBETMVPContract();
    const earnedpoints = await betMVPContract.methods.getTotolUserWagerAmount( await getAccount() ).call();
    return earnedpoints;
}

export const claimrewards = async (id) => {
    const betMVPContract = await getBETMVPContract();
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
    const betMVPContract = await getBETMVPContract();
    const resutl = await betMVPContract.methods.reclaimWager(id).send({
        from: await getAccount(),      
    });
    if(resutl.status == true){
        alert("Refund Successfully")
    }
    else{
        alert("Failed")
    }
    return resutl;
}

export const bettorscounts = async (id, occured) => {
    const betMVPContract = await getBETMVPContract();
    let result = await betMVPContract.methods.getOccurrenceBetCount(id, occured).call();
    return result
}

export const bettorscountspercent = async (id, occured,bettcont) => {
    // console.log("id occured betcount",id, occured,bettcont)
    const betMVPContract = await getBETMVPContract();
    return await (betMVPContract.methods.getOccurrenceBetCount(id, occured).call())/bettcont*100
    
}

export const AmountStackOnEventByaUser = async (id) => {
    const betMVPContract = await getBETMVPContract();
    const resutl = await betMVPContract.methods.getUserEventWager(id, await getAccount() ).call();
    return resutl;
}

export const GetUserWonAmountOnEvent = async (id) => {
    const betMVPContract = await getBETMVPContract();
    const resutl = await betMVPContract.methods.getUserEventWon(id, await getAccount() ).call();
    return resutl;
}
export const pendingpoint = async () => {
    const betMVPContract = await getBETMVPContract();
    const resutl = await betMVPContract.methods.getUserPendingPoints(await getAccount()).call();
    return Number(resutl/10**9)
}
export const cancelevent = async (id) => {
    const betMVPContract = await getBETMVPContract();
    const resutl = await betMVPContract.methods.cancelEvent(id).send({
        from: await getAccount(),      
    });
    if(resutl.status == true){
        alert("Event Canceled")
        await TotalEventsCount();
        window.location.reload(false);

    }
    else{
        alert("Failed")
    }
    return resutl
}

export const allactiveusers = async () => {
    const betMVPContract = await getBETMVPContract();
    const resutl = await betMVPContract.methods.getActiveUsers().call();
    return resutl
}

export const totalpayout = async () => {
    const betMVPContract = await getBETMVPContract();
    const resutl = await betMVPContract.methods.getTotalPayout().call();
    return resutl
}

export const activeuserslist = async () => {
    const betMVPContract = await getBETMVPContract();
    const resutl = await betMVPContract.methods.getActiveUsersList().call();
    return resutl
}
export const counttotalbetscreated = async (address) =>{
    const betMVPContract = await getBETMVPContract();
    const betsHistory = await betMVPContract.methods.getUserEventHistory(address).call({'from': await getAccount()});
    return betsHistory;
}

export const totalbetcreated = async() => {
    let users = await activeuserslist();
    let history = []
    let createbets = 0
    console.log("histroy is",history)
    for(const m of users){
        history = await counttotalbetscreated(m);
        createbets = createbets + history.length
    }
    console.log("created bets are", createbets)
    return createbets
}