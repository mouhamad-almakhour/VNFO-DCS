
const createvnf = document.getElementById("createid")
const bcblock=  document.getElementById("BlockchainEvents");
//const createSC = document.getElementById("createidsc")
/*const response0 = await fetch("../scr/contract_addresses/orchestrator_address.json");
const orchetratorAddress = await response0.json();

const response1 = await fetch("../scr/abi_contract/abi_orchestrator.json");
const orchetratorabi = await response1.json();*/


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







/*async function createVNFSC() { 

	let receipt = await contract.methods.createVNFcontract_instance().send( {from: accounts[0], gas: '3000000' } ,  function(error, resp){
	if(error){
		bcblock.innerHTML +="<br>"+ JSON.stringify("you are not a user, please register before");
		bcblock.innerHTML +="<br>"+ JSON.stringify(error);
		return
	}
	//document.getElementById("createvnf").disabled = false;	
})

console.log(receipt)
//createSC.disabled = true;
//createvnf.disabled = false;
bcblock.innerHTML += "<br>"+JSON.stringify(receipt);

   //return receipt;
   
}*/

const web3 = new Web3(window.ethereum);
var  contract= new web3.eth.Contract(orchetratorabi,orchetratorAddress);
const accounts= await  ethereum.request({ method: 'eth_requestAccounts' });

async function openstackcreate() {

var cpu= parseInt(document.forms["create"]["cpu"].value);
var memory= parseInt(document.forms["create"]["memory"].value);
var storage= parseInt(document.forms["create"]["storage"].value);


  var data = {"cpu" : document.forms["create"]["cpu"].value, "memory" : document.forms["create"]["memory"].value,"storage" : document.forms["create"]["storage"].value};
  
  let  receipt0  = await contract.methods.FetchVNF(cpu,memory,storage).send({ from: accounts[0]} ,  function(error, resp){
	if(error){
		bcblock.innerHTML +="<br>"+ JSON.stringify("you are not a user or required resources are not availible, please register before");
		bcblock.innerHTML +="<br>"+ JSON.stringify(error);
		return
	}})
	let amount = receipt0.events.Fetch.returnValues.b;
	//var amount=(cpu + memory+ storage)* 0.005 ;
	//console.log(amount)
	
var receipt = await contract.methods.create_VNF('data.vnfid','data.vnfdid',cpu,storage,memory).send( {from: accounts[0], gas: '3000000', value:amount },  function(error, resp){
	if(error){
		bcblock.innerHTML +="<br>"+ JSON.stringify("******* Warning: Creation faild******************");
		bcblock.innerHTML +="<br>"+ JSON.stringify(error);
		return
	}
})


//console.log(receipt);

bcblock.innerHTML += "<br>"+JSON.stringify( "the amount is :"+ amount);
bcblock.innerHTML += "<br>"+JSON.stringify( "the The smart contract address is :"+ receipt.events.newinstanceSC.returnValues.addresscontract);
bcblock.innerHTML += "<br>"+JSON.stringify( "the smart contract owner address is :"+receipt.events.newinstanceSC.returnValues.ownercontract);
bcblock.innerHTML += "<br>"+JSON.stringify( receipt.events.newinstanceSC.returnValues.text);
bcblock.innerHTML += "<br>"+JSON.stringify( "transaction details :"+ JSON.stringify(receipt));
 

const res = await fetch('http://127.0.0.1:3000/createvnf', {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
}).then((resp) =>{//console.log(resp) ;
	return resp.json(); })
.then(async (data) =>   {
	//console.log(data.vnfid);

	
	const id = data.vnfid.replace('"', '');
	const id1 = id.replace('"', '');
	const idd = data.vnfdid.replace('"', '');
	const idd1 = idd.replace('"', '');
	console.log(id);
					const receipt1 = await contract.methods.setID(id1, idd1).send( {from: accounts[0], gas: '1000000'},  function(error, resp){
						if(error){
							bcblock.innerHTML +="<br>"+ JSON.stringify(error);
							return
						}
					})

					bcblock.innerHTML += "<br>"+JSON.stringify( "transaction details :"+ JSON.stringify(receipt1));
document.getElementById("OpenstackEvents").innerHTML += "<br>VNF ID: ";
document.getElementById("OpenstackEvents").innerHTML += (data.vnfid);
document.getElementById("OpenstackEvents").innerHTML += "<br>VNFD ID: ";
document.getElementById("OpenstackEvents").innerHTML += (data.vnfdid);
document.getElementById("scaleid").disabled = true;
document.getElementById("deleteid").disabled = true;
setTimeout(() => {  document.getElementById("scaleid").disabled = false; }, 30000);
setTimeout(() => {  document.getElementById("deleteid").disabled = false; }, 30000);
})


}



/*const createVNF1 = async () => { 

          let   SC_new= await createVNFSC();

            console.log(SC_new);

          let openstack= await openstackcreate();
      
        console.log(openstack);
    //var receipt = await await contract.methods.create_VNF(openstack.vnfid,openstack.vnfdid,cpu,storage,memory).send( {from: accounts[0], gas: '3000000', value : '1500000000000000000' });

    //bcblock.innerHTML += JSON.stringify(receipt);


  }*/


//createSC.onclick=createVNFSC; 

createvnf.onclick=openstackcreate;