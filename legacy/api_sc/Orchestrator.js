//const Events = require('./events.js');
//const Web3 = require('web3');

import orchetratorAddress from '../scr/contract_addresses/orchetrator_address.json';
import orchetratorabi from '../scr/abi_contract/abi_orchestrator.json';
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('HTTP://127.0.0.1:8545'));


//var orchetratorAddress = require('C:/Users/admindsi/Desktop/web projet/scr/contract_addresses/orchetrator_address.json');
//var orchetratorabi = require('C:/Users/admindsi/Desktop/web projet/scr/abi_contract/abi_orchestrator.json');
var OrchetratorContract = new web3.eth.Contract(orchetratorabi, orchetratorAddress.addressSC);
//var account = '0x91DA40d73C76B18570c453043D02b488b6Ee73eB';



var abivnf = require('C:/Users/admindsi/Desktop/web projet/scr/abi_contract/abi_vnf.json');



var contractAddress1 = require('C:/Users/admindsi/Desktop/web projet/scr/contract_addresses/vnffactory_address.json');
var abi1 = require('C:/Users/admindsi/Desktop/web projet/scr/abi_contract/abi_vnffactory.json');
var contract1 = new web3.eth.Contract(abi1, contractAddress1.addressSC);


var vnffactoryAddress = require('C:/Users/admindsi/Desktop/web projet/scr/contract_addresses/vnffactory_address.json');
var vnffactoryabi = require('C:/Users/admindsi/Desktop/web projet/scr/abi_contract/abi_vnffactory.json');
var vnffactorycontract = new web3.eth.Contract(vnffactoryabi, vnffactoryAddress.addressSC);


async function getCurrentAccount() {
  const accounts= await ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
}


   /**************************************************** */
    /**************************************************** */
    /**********************  Fetch VNF****************************** */
 async function Fetch_VNF(_CPU, _Storage, _RAM ) {

  let account= await getCurrentAccount();

  _CPU = parseInt(document.forms["fetch"]["cpu"].value);
  _RAM = parseInt(document.forms["fetch"]["memory"].value);
  _Storage = parseInt(document.forms["fetch"]["storage"].value);
  console.log(_CPU +"   " + _RAM +"   " +_Storage  );

    const receipt = await OrchetratorContract.methods.FetchVNF(_CPU,  _Storage,  _RAM).send( {from: account, gas: '1000000'}, function (err, res) {

        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res);
       
       
      }); //receipt.events.ResourcesAVALIBILities
      
      console.log(receipt.events.Fetch.returnValues.text+":" + receipt.events.Fetch.returnValues.b + "Wei")
      return  (receipt.events.Fetch.returnValues.b);
    }

    //Fetch_VNF(1, 1, 1 );


    
    /**************************************************** */
    /**************************************************** */
    /**********************  Deploy VNF****************************** */
 async function Create_VNFSC(accountmetamask) {
   
    const receipt =  await OrchetratorContract.methods.createVNFcontract_instance().send( {from: accountmetamask, gas: '3000000', value: 100000})
    /*, function (err, res) {

        if (err) {
          console.log("An error occured", err)
          return
        }
    
    });*/
  //  console.log(receipt);
    
    //const eventout =  await contract1.getPastEvents('newinstanceSC', {fromBlock: 'latest',
       // toBlock: 'latest'}, function(error, events){ console.log(events); 
        
            //return events;
       // })


}

 async function createVNF(accountmetamask,_vnfid, _vnfdid,_CPU, _Storage, _RAM) {
    
    const receipt1 =  OrchetratorContract.methods.create_VNF(_vnfid,_vnfdid,_CPU, _Storage, _RAM).send( {from: accountmetamask, gas: '3000000'}, function (err, res) {

        if (err) {
          console.log("An error occured", err)
          return
        }
        
        web3.eth.getTransaction(res, function(err, result) {
         console.log(result)
      });
    });
   // console.log(receipt1)
    
}
/**************************************************** */
/**************************************************** */
/**************************************************** */



  /**************************************************** */
/**************************************************** */
/*************************Termintae VNF*************************** */

 async function DeleteVNF(VNFID) {

    //VNFID
    const receipt0 = await vnffactorycontract.methods.getaddresscontract(account).call( {from: account, gas: '3000000'});
    
    //console.log(receipt0)

   const receipt = await OrchetratorContract.methods.Terminate_VNF(VNFID).send( {from: account, gas: '3000000'}, function (err, res) {

        if (err) {
          console.log("An error occured", err)
          return
        }
    
        //console.log("Hash of the transaction: " + res);
        
       
      });
      //console.log(receipt);
      
      
      var _vnfd_if= Events.get_TerminateVNF_event(receipt0)
      return _vnfd_if
      
  }

  //  receipt.events.Fetch.returnValues.b

  //DeleteVNF()

  //DeleteVNF(1);


  /**************************************************** */
/**************************************************** */
/**************************Scale VNF************************** */

   async function SCALE_OUT_VNF(VNFID, _CPU, _Storage, _RAM) {

    const receipt = await OrchetratorContract.methods.Scale_VNF(VNFID, _CPU, _Storage, _RAM).send( {from: account, gas: '1000000'}, function (err, res) {

        if (err) {
          console.log("An error occured", err)
          return
        }
    
        console.log("Hash of the transaction: " + res);
    
       
      }); //receipt.events.ScaleVNF.returnValues.Pr_add
      console.log(receipt);
      
  }



  
  //module.exports = {Fetch_VNF,Create_VNFSC,createVNF,DeleteVNF,SCALE_OUT_VNF};

 
