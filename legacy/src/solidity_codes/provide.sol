// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract Provider {

event register_provider(address UserAdd, string service);
event unregister_provider(address UserAdd, string service);

struct provider{
 
    address add;
    string service;
}

mapping(address => provider)  providers;

constructor () {
Registerprovider("", "A");
Registerprovider("", "B");
Registerprovider("", "C");
}

address ochr_adress;

modifier onlyorchestrator() {
        require(msg.sender ==ochr_adress,"you are not able to do this operation");     
    _;    
}

function getUser(address _u) public view returns(provider memory p){
              return providers[_u] ;
}


function Isuser(address _u) public view returns(bool a ) {
         if (providers[msg.sender].add ==_u  ){
            a =true;
          
    }
  return a;
}

function Registerprovider(address _u, string memory service) public  {
        providers[_u]= provider(_u, service);
        emit register_provider(_u, service);        
    } 

function unRegisterprovider(address u) public {
      providers[u]= provider(0x0000000000000000000000000000000000000000, "null");
        emit unregister_provider(providers[u].add, providers[u].service);
    } 
}

}

