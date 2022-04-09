// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Transaction {
    uint private price=80 wei; //ราคาหวย
    address payable private owner;
    constructor()payable {
        owner = payable(msg.sender);
    }
   

    function getBalance() public view returns(uint) {
        return msg.sender.balance; 
    }
    function getBalanceOwner() public view returns(uint) {
        return owner.balance; 
    }
    function getMyaddress() view public returns(address){
        return msg.sender;
    }

    // msg.sender โอนเงิยไปให้ owner
    function sendViaTransfer1() public payable {
        owner.transfer(msg.value);
    }
    function sendViaTransfer(address payable _to) public payable {
        // This function is no longer recommended for sending Ether.
        _to.transfer(msg.value);
    }

    // https://eth-converter.com/
    function s1ether() public payable {
        //require(msg.value >= 1 ether, "You must pay at least 1 ETH per cupcake");
        //require(msg.value >= 0.00000008 ether, "You must pay at least 1 ETH per cupcake");
        require(msg.value >= price, "You must pay at least 1 ETH per cupcake");
    }
    function s2ether() public payable {
        //require(msg.value >= 1 ether, "You must pay at least 1 ETH per cupcake");
        //require(msg.value >= 0.00000008 ether, "You must pay at least 1 ETH per cupcake");
        require(msg.value >= 20 gwei, "You must pay at least 1 ETH per cupcake");
    }



    


}
