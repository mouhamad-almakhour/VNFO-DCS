// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract Orchestrator{

	User ur;
	VNFfactory vnffactory;
	event Fetch( uint256 b, string text);
	event ResourcesAVALIBILities(uint a, uint b, uint c , string text);
	event payment( uint c , string text);
	event newinstanceSC(address addresscontract, address ownercontract, string text);

struct vnfdetail {
                    
                    string id_VNF;
                    address VNF_contract;
                    uint256 VNF_cpu;
                    uint256 VNF_memory;
                    uint256 VNF_storage; 
                    bool VNF_Iscreated;       
                    }

	uint256  cpu_capacity=10 ;
	uint256  storage_capacity=1000 ;
	uint256  memory_capacity=64000 ;


	//address payable orch_owner;
	address payable orch_address;
	mapping(address =>vnfdetail ) public details;



modifier onlyuser(address _u) {
    require(ur.Isuser(_u)==true,"user is not registred");   
    _;
}


constructor() payable{
            //orch_owner = payable(msg.sender);
            orch_address= payable(address(this));
    }


function setaddresscontracts(address _user, address _factory) public {
                ur = User(_user);    
                vnffactory =VNFfactory(_factory);
    }

function registerUser() public {
        ur.Registeruser(msg.sender);
}

function UnregisterUser(uint id) public {
        ur.unRegisteruser(id, msg.sender);
}

function FetchVNF(uint _CPU, uint _Storage,  uint _RAM) public onlyuser(msg.sender) returns (bool success, uint amountTopay){
    success=false;
    if(_CPU<= cpu_capacity && _Storage<=storage_capacity && _RAM<=memory_capacity){
        amountTopay= (_CPU + _Storage+ _RAM) * 0.005 ether;
        success=true;
        emit Fetch( amountTopay, "resources are availibile and the amount to pay is calculated" );
                        }
            return (success,amountTopay);
            }


function create_VNF(string memory VNF_ID, string memory VNFD_ID, uint _CPU,uint _Storage, uint _RAM ) public payable onlyuser(msg.sender){
    (bool R, uint256 amount)= FetchVNF(_CPU,_Storage,_RAM);

if ( R==true){
     details[msg.sender].VNF_contract= vnffactory.createVNFContract(msg.sender); 
     emit newinstanceSC(details[msg.sender].VNF_contract,msg.sender,"new vnf contract instance is delpoyed");
     }else{
        revert("required VNF resources are not availibile");
    }
    
if ( details[msg.sender].VNF_Iscreated != true ){
                
                    VNF(details[msg.sender].VNF_contract).createVNF(VNF_ID,VNFD_ID, msg.sender,_CPU,_Storage,_RAM);
                    details[msg.sender].id_VNF= VNF_ID;
                    details[msg.sender].VNF_Iscreated = true;
                    details[msg.sender].VNF_cpu= _CPU;
                    details[msg.sender].VNF_memory= _RAM;
                    details[msg.sender].VNF_storage= _Storage;
                    storage_capacity -=  _Storage;
                    memory_capacity -=_RAM;
                    cpu_capacity -= _CPU;
                    payable(address(this)).call{value: amount}("");               
    }else{
        revert("please delete your old vnf to create a new one");
    }
}


function setID( string memory vnfid, string memory vnfdid )public  onlyuser(msg.sender){
        VNF(details[msg.sender].VNF_contract).setVNFIDs(msg.sender,vnfid,vnfdid);
}


function Terminate_VNF() public  payable onlyuser(msg.sender) {

         VNF( details[msg.sender].VNF_contract).terminateVNF(payable(msg.sender));
         details[msg.sender].VNF_Iscreated = false;
         cpu_capacity +=  details[msg.sender].VNF_cpu;
         memory_capacity +=   details[msg.sender].VNF_memory;
         storage_capacity += details[msg.sender].VNF_storage ; 
           
}



function Scale_VNF_out(uint _cpu, uint _storage, uint _memory) public payable onlyuser( msg.sender) {

   ( bool R , uint256 amount)=FetchVNF(_cpu,_storage,_memory);
    if(R==true){
    //    address contractinstance = vnffactory.getaddresscontract(msg.sender);

        VNF(details[msg.sender].VNF_contract).scaleVNFOut(msg.sender, _cpu,  _storage,  _memory);
       
                 details[msg.sender].VNF_cpu+= _cpu;
                 details[msg.sender].VNF_memory+= _memory;
                 details[msg.sender].VNF_storage+=_storage;
               
                storage_capacity -=  _storage;
                memory_capacity -=_memory;
                cpu_capacity -= _cpu;

               payable(address(this)).call{value: amount}("");
          }
}

function getVNFdetails() public view returns( vnfdetail memory Mydetails){
    Mydetails= details[msg.sender];
    return Mydetails;
}


function getresources() public view returns( uint CPU, uint Memory, uint Storage){  
    return (cpu_capacity,memory_capacity,storage_capacity);

}

receive() external payable {
      emit payment( msg.value ,'payment done' );
    }
