  const loginbuttom= document.getElementById('loginbuttom');
  //const UserID= document.getElementById('UserID');
  //const UserAddress= document.getElementById('UserAddress');

  /*const response = await fetch("../scr/contract_addresses/user_address.json");
  const address = await response.json();

  const response1 = await fetch("../scr/abi_contract/abi_user.json");
  const abi = await response1.json();
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


async function adduser() {
    
 try {
  console.log("start");
    const web3 = new Web3(window.ethereum);
    var  contract_user= new web3.eth.Contract(userabi, useraddress);
    const accounts= await  ethereum.request({ method: 'eth_requestAccounts' });

	const receipt0 = await contract_user.methods.Isuser(accounts[0]).call( {from: accounts[0], gas: '1000000'});
	console.log(receipt0);
     
	if(receipt0 == true) {
		window.location.href = 'http://127.0.0.1:3000/homepage.html';

	}else {

			const receipt = await contract_user.methods.Registeruser(accounts[0]).send( {from: accounts[0], gas: '1000000'});
			console.log( localStorage["UserAddress"]);
			
			console.log(receipt);
			console.log(accounts[0]);
			window.location.href = 'http://127.0.0.1:3000/homepage.html';	
  
	}
	
    
     //localStorage["UserAddress"] = JSON.stringify( receipt.events.register_User.returnValues.UserAdd);
     //localStorage["UserID"] = JSON.stringify( receipt.events.register_User.returnValues.UserID);

    

    

  }
  catch (error) {

    window.alert("Please install MetaMask");
    console.log(error);
 }
     
  }

  
    
     
 loginbuttom.onclick = adduser;
  






