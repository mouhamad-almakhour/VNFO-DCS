const Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('HTTP://127.0.0.1:8545'));


var orchetratorAddress = require('C:/Users/admindsi/Desktop/web projet/scr/contract_addresses/orchetrator_address.json');
var orchetratorabi = require('C:/Users/admindsi/Desktop/web projet/scr/abi_contract/abi_orchestrator.json');
var OrchetratorContract = new web3.eth.Contract(orchetratorabi, orchetratorAddress.addressSC);
var account = '0x91DA40d73C76B18570c453043D02b488b6Ee73eB';



var abivnf = require('C:/Users/admindsi/Desktop/web projet/scr/abi_contract/abi_vnf.json');



var userAddress = require('C:/Users/admindsi/Desktop/web projet/scr/contract_addresses/user_address.json');
var userabi = require('C:/Users/admindsi/Desktop/web projet/scr/abi_contract/abi_user.json');
var Usercontract = new web3.eth.Contract(userabi, userAddress.addressSC);


var providerAddress = require('C:/Users/admindsi/Desktop/web projet/scr/contract_addresses/provider_address.json');
var providerabi = require('C:/Users/admindsi/Desktop/web projet/scr/abi_contract/abi_provider.json');
var providercontract = new web3.eth.Contract(providerabi, providerAddress.addressSC);


var vnffactoryAddress = require('C:/Users/admindsi/Desktop/web projet/scr/contract_addresses/vnffactory_address.json');
var vnffactoryabi = require('C:/Users/admindsi/Desktop/web projet/scr/abi_contract/abi_vnffactory.json');
var vnffactorycontract = new web3.eth.Contract(vnffactoryabi, vnffactoryAddress.addressSC);



/**************************************************************************************
 /////////////////////////////  Provider Events///////////////////////////////////  */

 async function get_register_provider_event() {
    const event =  await providercontract.getPastEvents('register_provider', {fromBlock: 'latest', toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }

  async function get_unregister_provider_event() {
    const event =  await providercontract.getPastEvents('unregister_provider', {fromBlock: 'latest', toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }

  async function get_ALLevent_provider() {
    const event =  await providercontract.events.allEvents( {fromBlock: 0,
        toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }

/**************************************************************************************/






/**************************************************************************************
 /////////////////////////////  User Events///////////////////////////////////  */

 async function get_register_User_event() {
    const event =  await Usercontract.getPastEvents('register_User', {fromBlock: 'latest', toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }

  async function get_unregister_User_event() {
    const event =  await Usercontract.getPastEvents('unregister_User', {fromBlock: 'latest', toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }


  async function get_ALLevent_User() {
    const event =  await Usercontract.events.allEvents( {fromBlock: 0,
        toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }
/**************************************************************************************/







/**************************************************************************************
 /////////////////////////////  VNFfactory Events///////////////////////////////////  */

 async function get_newinstanceSC_event() {
    const event =  await vnffactorycontract.getPastEvents('newinstanceSC', {fromBlock: 'latest', toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }

  
  async function get_ALLevent_VNFfactory() {
    const event =  await vnffactorycontract.events.allEvents( {fromBlock: 0,
        toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }

/**************************************************************************************/




/**************************************************************************************
 /////////////////////////////  VNF Events///////////////////////////////////  */

async function get_CreateVNF_event(addressSC) {
  
    var contractvnf = new web3.eth.Contract(abivnf, addressSC);
   
    const event =  await contractvnf.getPastEvents('CreateVNF', {fromBlock: 'latest',
        toBlock: 'latest'}, function(error, events){
          
        
            return events;
        })
  
      console.log(event);
  }
  
  async function get_ScaleVNF_event(addressSC) {
    
    var contractvnf = new web3.eth.Contract(abivnf, addressSC);
   
    const event =  await contractvnf.getPastEvents('ScaleVNF', {fromBlock: 'latest',
        toBlock: 'latest'}, function(error, events){
          
        
            return events;
        })
  
      console.log(event);
  }
  
  async function get_TerminateVNF_event(addressSC) {

    
    var contractvnf = new web3.eth.Contract(abivnf, addressSC);
   
    const event =  await contractvnf.getPastEvents('TerminateVNF', {fromBlock: 0,
        toBlock: 'latest'})
        console.log(event.events.TerminateVNF.returnValues.VNFD_id)
      return  (event.events.TerminateVNF.returnValues.VNFD_id);
  }

  //get_TerminateVNF_event('0x39E5D2458153208C4789F4c6A97fbA190cDD3021')


  async function get_ALLevent_vnf(addressSC) {
    var contractvnf = new web3.eth.Contract(abivnf, addressSC);
    const event =  await contractvnf.events.allEvents( {fromBlock: 0,
        toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }


  /**************************************************************************************/


  
/**************************************************************************************
 /////////////////////////////  Orchestrator Events///////////////////////////////////  */

 async function get_Fetch_event() {
    const event =  await OrchetratorContract.getPastEvents('Fetch', {fromBlock: 'latest',
        toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }


  async function get_ResourcesAVALIBILities_event() {
    const event =  await OrchetratorContract.getPastEvents('ResourcesAVALIBILities', {fromBlock: 'latest',
        toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }


  async function get_payment_event() {
    const event =  await OrchetratorContract.getPastEvents('payment', {fromBlock: 'latest',
        toBlock: 'latest'}, function(error, events){
            return events;
        })
      console.log(event);
  }


  async function get_ALLevent_Orchetrator() {
    const event =  await OrchetratorContract.events.allEvents()
      console.log(event);
  }

  //get_ALLevent_provider()
  //get_register_provider_event()
  //get_ALLevent_Orchetrator()
  //get_ALLevent_User()
  //get_ALLevent_provider()
  //get_ALLevent_vnf('0x35450Ae5E398A76Db5ba26d97BfF6EF467CeE12A')
  //get_ALLevent_VNFfactory()
  module.exports = {get_TerminateVNF_event};



