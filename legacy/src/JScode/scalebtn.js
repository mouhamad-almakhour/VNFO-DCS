const btn3 = document.getElementById("scaleid")
const bcblock=  document.getElementById("BlockchainEvents");

/*
const response6 = await fetch("../scr/contract_addresses/orchestrator_address.json");
const orchetratorAddress = await response6.json();

const response7 = await fetch("../scr/abi_contract/abi_orchestrator.json");
const orchetratorabi = await response7.json();

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






async function SCALEVNF() {

	const web3 = new Web3(window.ethereum);
var  contract= new web3.eth.Contract(orchetratorabi, orchetratorAddress);
const accounts= await  ethereum.request({ method: 'eth_requestAccounts' });


var cpu_value = parseInt(document.forms["scale"]["cpu"].value);
var memory_value = parseInt(document.forms["scale"]["memory"].value);
var storage_value = parseInt(document.forms["scale"]["storage"].value);

var vnfid = document.forms["scale"]["vnfid"].value;

/*	let  receipt0  = await contract.methods.FetchVNF(cpu_value,memory_value,storage_value).send({ from: accounts[0]} ,  function(error, resp){
		if(error){
			bcblock.innerHTML +="<br>"+ JSON.stringify("Required resources are not availibile, Fetch faild");
			bcblock.innerHTML +="<br>"+ JSON.stringify(error);
			return
		}})*/
	
		
		var amount=(cpu_value + memory_value+ storage_value) * 15000000000000000;
const receipt = await contract.methods.Scale_VNF_out(cpu_value, storage_value ,memory_value).send( {from: accounts[0], gas: '1000000', value :amount },  function(error, resp){
	if(error){
		bcblock.innerHTML +="<br>"+ JSON.stringify("you are not a user, please register before");
		bcblock.innerHTML +="<br>"+ JSON.stringify(error);
		return
	}})
	bcblock.innerHTML += "<br>*******************Scale Out VNF*************************";
	bcblock.innerHTML += "<br>********************************************";  
      bcblock.innerHTML += "<br>Scaling out successful "; 
	  bcblock.innerHTML +="<br>"+ JSON.stringify(receipt);
	  bcblock.innerHTML += "<br>********************************************"; 
	  return receipt;
  }



async function openstackscale(){
	const web3 = new Web3(window.ethereum);
	var  contract= new web3.eth.Contract(orchetratorabi, orchetratorAddress);
	const accounts= await  ethereum.request({ method: 'eth_requestAccounts' });

    console.log("scale VNF");  

	const receipt = await contract.methods.getVNFdetails().call( {from: accounts[0], gas: '1000000'});
   // window.alert(receipt);
	var VNFID= receipt[0];
	var cpunb= receipt[2];
	var Mnb= receipt[3];
	var Snb= receipt[4];
    var data = {"cpu" : cpunb, "memory" : Mnb,"storage" : Snb, "vnfid": document.forms["scale"]["vnfid"].value};
   
    const resp = await fetch('http://127.0.0.1:3000/scalevnf', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then((resp) =>{ return resp.json();})
.then( async (data) => {
	const id = data.vnfid.replace('"', '');
	const id1 = id.replace('"', '');
	const idd = data.vnfdid.replace('"', '');
	const idd1 = idd.replace('"', '');
const receipt1 = await contract.methods.setID(id1, idd1).send( {from: accounts[0], gas: '1000000'},  function(error, resp){
	if(error){
		bcblock.innerHTML +="<br>"+ JSON.stringify(error);
		return
	}})
 
	bcblock.innerHTML += "<br>New VNF ID: " +(data.vnfid);
	bcblock.innerHTML += "<br>New VNFD ID: "+(data.vnfdid);
	bcblock.innerHTML += "<br>********************************************"; 
	
	document.getElementById("OpenstackEvents").innerHTML += "<br>******************************************************"; 
	document.getElementById("OpenstackEvents").innerHTML += "<br>****************Scale Out VNF ****************************"; 
	document.getElementById("OpenstackEvents").innerHTML += "<br>Scaling successfully "; 
    document.getElementById("OpenstackEvents").innerHTML += "<br>New VNF ID: " +(data.vnfid);
    document.getElementById("OpenstackEvents").innerHTML += "<br>New VNFD ID: "+(data.vnfdid);
	document.getElementById("deleteid").disabled = true;
	setTimeout(() => {  document.getElementById("deleteid").disabled = false; }, 30000)

})

}


async function scale() {

	let Scaleblockchain= await SCALEVNF()
	console.log(Scaleblockchain)


	let Scaleopenstack= await openstackscale()
	//console.log(Scaleopenstack)



}



btn3.onclick=scale;
