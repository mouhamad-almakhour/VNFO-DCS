//const registerUbtn = document.getElementById("btn1")
const bcblock=  document.getElementById("BlockchainEvents");
const unregisterUbtn = document.getElementById("unregisterUser")

/*
const response = await fetch("../scr/contract_addresses/user_address.json");
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



/*async function registerUSER() 
 {
    const receipt = await contract_user.methods.Registeruser().send( {from: accounts[0], gas: '1000000'});
    
	bcblock.innerHTML +="<br>" + "Your address is registred";
	bcblock.innerHTML +="<br>" + "User Address: " +receipt.events.register_User.returnValues.UserAdd;
	bcblock.innerHTML +="<br>" + "User ID: " +receipt.events.register_User.returnValues.UserID;
	bcblock.innerHTML +="<br>"+ "Transaction details: ";
	bcblock.innerHTML +="<br>"+ JSON.stringify(receipt);


}*/

async function unregisterUSER()  {

const web3 = new Web3(window.ethereum);
var  contract_user= new web3.eth.Contract(userabi, useraddress);
//var  contract= new web3.eth.Contract(orchetratorabi,orchetratorAddress);
const accounts= await  ethereum.request({ method: 'eth_requestAccounts' });

	let  id= localStorage.getItem("ID");
	id = Number(id.substring(1,id.length-1));
	console.log(id);
	// add variable ID , take it from ID user in top of the page
    const receipt = await contract_user.methods.unRegisteruser(id, accounts[0]).send( {from: accounts[0], gas: '1000000'},  function(error, resp){
	 if(error){
		bcblock.innerHTML +="<br>" + "UnRegistration Faild";
		bcblock.innerHTML +="<br>"+ JSON.stringify(receipt);
		return
	}

	
	console.log(resp);
	
	})
	bcblock.innerHTML +="<br>" + "********************************************************************";
	bcblock.innerHTML +="<br>" + "Your address is unregistred";
	bcblock.innerHTML +="<br>" + "User Address: " +receipt.events.unregister_User.returnValues.UserAdd;
	bcblock.innerHTML +="<br>" + "User ID: " + receipt.events.unregister_User.returnValues.UserID;
	bcblock.innerHTML +="<br>"+  "Transaction details: "+JSON.stringify(receipt);

	
	

}





	//registerUbtn.onclick=registerUSER;
	unregisterUbtn.onclick=unregisterUSER;


