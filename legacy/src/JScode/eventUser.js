
  const UserID= document.getElementById('UserID');
  const UserAddress1= document.getElementById('UserAddress');
  //const bcblock=  document.getElementById("BlockchainEvents");



  /*const response = await fetch("../scr/contract_addresses/user_address.json");
const useraddress = await response.json();

const response1 = await fetch("../scr/abi_contract/abi_user.json");
const userabi = await response1.json();
*/

var userabi=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "UserAdd",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "UserID",
				"type": "uint256"
			}
		],
		"name": "register_User",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "UserAdd",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "UserID",
				"type": "uint256"
			}
		],
		"name": "unregister_User",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_u",
				"type": "address"
			}
		],
		"name": "Registeruser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idpr",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "u",
				"type": "address"
			}
		],
		"name": "unRegisteruser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_u",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "add",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ID",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "registered",
						"type": "bool"
					}
				],
				"internalType": "struct User.user",
				"name": "u",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_u",
				"type": "address"
			}
		],
		"name": "Isuser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "a",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
  
  var useraddress= "0xe71Bf498c529d335d6926e89D5E4c26758Dba692";



async function userevent(){
	
const web3 = new Web3(window.ethereum);
const accounts= await  ethereum.request({ method: 'eth_requestAccounts' });
var  contract_user= new web3.eth.Contract(userabi, useraddress);
	
const receipt = await contract_user.methods.getUser(accounts[0]).call( {from: accounts[0], gas: '1000000'});
//const event =  await contract_user.getPastEvents('register_User', {fromBlock:'latest', toBlock: 'latest'}, function(error, events){

 // bcblock.innerHTML +="<br>" + "User Address: " + receipt[0].returnValues.UserAdd;
  //bcblock.innerHTML +="<br>" + "User ID: " +receipt[1].returnValues.UserID;
//const a = events[0].returnValues.UserAdd;
//const b =events[0].returnValues.UserID;
//localStorage.setItem ("Address",JSON.stringify( a));
//localStorage.setItem ("ID",JSON.stringify(b));
 //bcblock.innerHTML +="<br>"+ "Transaction details: ";
 //bcblock.innerHTML +="<br>"+ JSON.stringify(events[0]);
console.log(receipt)
 UserAddress1.innerHTML +=receipt[0];
 UserID.innerHTML +=receipt[1];
localStorage.setItem ("Address",JSON.stringify(receipt[0]));
localStorage.setItem ("ID",JSON.stringify(receipt[1]));
 //UserAddress1.innerHTML +=  localStorage.getItem("Address");
 //UserID.innerHTML +=  localStorage.getItem("ID");

 

}


 userevent();


