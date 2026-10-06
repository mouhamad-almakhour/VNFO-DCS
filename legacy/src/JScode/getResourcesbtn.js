const getbtn = document.getElementById("getRbtn");
const R = document.getElementById("resources");

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




async function getR() {
    
    try {


        const web3 = new Web3(window.ethereum);
        var  contract= new web3.eth.Contract(orchetratorabi,orchetratorAddress);
        const accounts= await  ethereum.request({ method: 'eth_requestAccounts' });
        const receipt = await contract.methods.getresources().call( {from: accounts[0], gas: '1000000'});
        var cpunb= JSON.stringify(receipt.CPU);
        var Mnb= JSON.stringify(receipt.Memory);
        var Snb= JSON.stringify(receipt.Storage);
   
       // window.alert( "CPU nb: "+ cpunb+","+  "  Memory (Mb): "+ Mnb+"," +  "  Storage (Gb): "+ Snb );
        R.innerHTML =  "CPU nb: "+ cpunb+","+  "  Memory (Mb): "+ Mnb+"," +  "  Storage (Gb): "+ Snb;
        console.log(receipt);
   
     }
     catch (error) {
   
       window.alert(error);
       
    }
        
     }
   
     
       
        
     getbtn.onclick = getR;
     
   
   
   
   
   
   
   