// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract User {

event register_User(address UserAdd, uint256 UserID);
event unregister_User(address UserAdd, uint256 UserID);

struct user{
 
       address add;
       uint256 ID;
       bool registered;
    }

mapping(uint => user)  users;
uint256 user_counter=1;


modifier onlyuser(uint _idpr, address _u) {
        require(_u ==users[_idpr].add,"you are not able to do this operation");     
    _;    
}

function getUser(address _u) public view returns(user memory u){
  
    uint256 i;
    for( i =0; i<=user_counter; i++){
        if (users[i].add ==_u && users[i].registered == true ){
            return (users[i] );
         } 
    }
  
}


function Isuser(address _u) public view returns(bool a ){
    a =false;
    uint256 i;
    for( i =0; i<=user_counter; i++){
        if (users[i].add ==_u  && users[i].registered == true){
            a =true;
         } 
    }

  return a;
}

function Registeruser(address _u) public  {

       users[user_counter]= user(_u, user_counter,true);
       emit register_User(_u, user_counter);
       user_counter++;  
} 

   function unRegisteruser(uint _idpr, address u) public onlyuser(_idpr, u) {
        users[_idpr].registered= false;
        emit unregister_User(users[_idpr].add, _idpr);
    } 
}
