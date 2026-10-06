// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract VNFfactory{
   VNF[] public vnf;
   mapping(address =>address) vnfaddress;

function createVNFContract(address _owner) external  payable  returns (address) {
   
        VNF vnf_contract_instance =  new VNF(_owner);
        vnf.push(vnf_contract_instance);
        vnfaddress[_owner]= address(vnf_contract_instance);
        return (vnfaddress[_owner]);
        
    }
  
}
