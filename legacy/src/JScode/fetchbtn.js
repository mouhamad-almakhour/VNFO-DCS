const fetchbtn = document.getElementById("fetchid");
const bcblock=  document.getElementById("BlockchainEvents");


/*
var response4 = await fetch("../scr/contract_addresses/orchestrator_address.json");
var orchetratorAddress = await response4.json();
var response5 = await fetch("../scr/abi_contract/abi_orchestrator.json");
var orchetratorabi = await response5.json();

*/



var orchetratorabi =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"name": "Fetch",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"name": "ResourcesAVALIBILities",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "addresscontract",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "ownercontract",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"name": "newinstanceSC",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"name": "payment",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "VNF_ID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "VNFD_ID",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_CPU",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_Storage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_RAM",
				"type": "uint256"
			}
		],
		"name": "create_VNF",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_CPU",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_Storage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_RAM",
				"type": "uint256"
			}
		],
		"name": "FetchVNF",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "amountTopay",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_cpu",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_storage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_memory",
				"type": "uint256"
			}
		],
		"name": "Scale_VNF_out",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_factory",
				"type": "address"
			}
		],
		"name": "setaddresscontracts",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "vnfid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vnfdid",
				"type": "string"
			}
		],
		"name": "setID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Terminate_VNF",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "UnregisterUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "details",
		"outputs": [
			{
				"internalType": "string",
				"name": "id_VNF",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "VNF_contract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "VNF_cpu",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "VNF_memory",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "VNF_storage",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "VNF_Iscreated",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getresources",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "CPU",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Memory",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Storage",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVNFdetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id_VNF",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "VNF_contract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "VNF_cpu",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "VNF_memory",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "VNF_storage",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "VNF_Iscreated",
						"type": "bool"
					}
				],
				"internalType": "struct Orchestrator.vnfdetail",
				"name": "Mydetails",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

var orchetratorAddress= "0x7Ed240fA25e34852DE3a6D4295F7783566083a04";

const web3 = new Web3(window.ethereum);
var contract= new web3.eth.Contract(orchetratorabi,orchetratorAddress);
const accounts= await  ethereum.request({ method: 'eth_requestAccounts' });
	
async function fetch() {
	var cpu_value = parseInt(document.forms["fetch"]["cpu"].value);
	var memory_value = parseInt(document.forms["fetch"]["memory"].value);
	var storage_value = parseInt(document.forms["fetch"]["storage"].value);

    //console.log(accounts[0]);
        var  receipt  = await contract.methods.FetchVNF(cpu_value,storage_value,memory_value ).send({ from: accounts[0]} ,  function(error, resp){
			if(error){
				bcblock.innerHTML +="<br>"+ JSON.stringify("you are not a user, please register before");
				bcblock.innerHTML +="<br>"+ JSON.stringify(error);
				return
			}
     

      })

   console.log(receipt);
   bcblock.innerHTML +="<br>"+"**************************************************************"
   bcblock.innerHTML +="<br>"+"***************************Fetch Resources***********************************"
   bcblock.innerHTML +="<br>"+receipt.events.Fetch.returnValues.text+":" + receipt.events.Fetch.returnValues.b + "Wei"
   bcblock.innerHTML += "<br>"+receipt;
  
  // console.log(receipt.events.Fetch.returnValues.text+":" + receipt.events.Fetch.returnValues.b + "Wei")

	}


  fetchbtn.onclick = fetch;
  

/*const check = async () => { 
      
        fetchbtn.onclick = fetch;

     }

      check();*/


