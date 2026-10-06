// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;


contract VNF{

	event CreateVNF(address _add, string VNF_id, string VNFD_id);
	event TerminateVNF(address _add, string VNF_id, string VNFD_id );
	event ScaleVNF(address _add, string VNF_id, string VNFD_id );


	string VNF_id;
	string VNFD_id;
	uint256 CPU_nb;
	uint256 RAM;
	uint256 Storage;         
	address  public  VNFowner;


modifier IsVNFOwner(address _u) {
    require(_u==VNFowner, "You are not the owner of the VNF");
    _;
}

constructor(address owner) payable{
    VNFowner= owner;
}

function createVNF( string memory VNF_ID, string memory VNFD_ID, address _u, uint _cpu, uint _storage, uint _memory) external IsVNFOwner(_u) {   
        VNF_id = VNF_ID;
        VNFD_id=VNFD_ID;
        CPU_nb=_cpu;
        RAM=_memory;
        Storage=_storage;
      emit CreateVNF(_u,VNF_ID, VNFD_ID);
       
}


function terminateVNF(address payable _u) payable external IsVNFOwner(_u) {
        emit TerminateVNF(_u,VNF_id,VNFD_id);
        selfdestruct(_u);     
}

function scaleVNFOut(address _u, uint _cpu, uint _storage, uint _memory ) external IsVNFOwner(_u) {
    CPU_nb+= _cpu; 
    RAM+= _memory;
    Storage+= _storage;   
    emit ScaleVNF(_u,VNF_id,VNFD_id ); 
}

function getVNF(address _u) external view IsVNFOwner(_u) returns (uint,uint,uint) {
     return (CPU_nb,RAM,Storage);
}

function setVNFIDs(address _u, string memory vnf_id_new, string memory vnfd_id_new) external  IsVNFOwner(_u){
         VNF_id=vnf_id_new;
        VNFD_id=vnfd_id_new;
 
 }
               
}
