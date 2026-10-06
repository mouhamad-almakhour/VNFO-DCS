
const Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('HTTP://127.0.0.1:8545'));


var contractAddress = require('C:/Users/admindsi/Desktop/web projet/scr/contract_addresses/user_address.json');
var abi = require('C:/Users/admindsi/Desktop/web projet/scr/abi_contract/abi_user.json');
var contract = new web3.eth.Contract(abi, contractAddress.addressSC);
var account = '0x91DA40d73C76B18570c453043D02b488b6Ee73eB';

 
async function RegisterUSER() {

    console.log(web3.version)

    const receipt = await contract.methods.Registeruser().send( {from: account, gas: '1000000'}, function (err, res) {

        if (err) {
          console.log("An error occured", err)
          return
        }
    
        console.log("Hash of the transaction: " + res);

        
      }); //receipt.events.register_User.returnValues.UserAdd
      //receipt.events.register_User.returnValues.UserID
      console.log(receipt.events.register_User);
      
  }

  async function UnRegisterUSER(IDUSER) {

    const receipt = await contract.methods.unRegisteruser(IDUSER).send( {from: account, gas: '1000000'}, function (err, res) {

        if (err) {
          console.log("An error occured", err)
          return
        }
    
        console.log("Hash of the transaction: " + res);

       
      }); //receipt.events.unregister_User.returnValues.UserAdd
      //receipt.events.unregister_User.returnValues.UserID
      console.log(receipt.events.unregister_User);
  }
 // RegisterUSER();
  //UnRegisterUSER(3);
  module.exports = {RegisterUSER,UnRegisterUSER};