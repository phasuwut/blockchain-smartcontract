// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Lottery
 * @dev Implements voting process along with vote delegation
 */
contract Lottery {
    uint private amountMax = 10; //จำนวนชุด
    /*     
        uint private LotteryMax=15; //จำนวนเลขของหวย ต่อเลข
        uint private pricex=80; //ราคาหวย
        uint private limit=2; //ซื้อได้สูงสุด 4 ใบ
    */

    struct Buyer { // ข้อมูลของผู้ใช้
        string firstName;
        string lastName;
        string email;
    }

    //ข้อมูลผู้ใช้
    mapping (address => Buyer) public buyerStruct;
    address[] buyer_result;  //เก็บ address ข้อมูลผู้ใช้

    function buyersRegister(string memory firstName, string memory lastName,string memory email) public {
        Buyer storage buyer = buyerStruct[msg.sender];
        buyer.firstName = firstName;
        buyer.lastName = lastName;
        buyer.email = email;

        buyer_result.push(msg.sender);
    }
    function get_buyer_result() view public returns (address[] memory) {
        return buyer_result;
    }
    function count_buyers() view public returns (uint) {
        return buyer_result.length;
    }




    //  Lottery
    struct Lottery_ { // ข้อมูล
        string lotteryNo; // จำนวนล็อต
        string period; // ช่วงวันที่ 
        uint amount;
        address [] listAddress; // address ของคนซื้อ 
    }

    mapping (string => Lottery_) public lotteryStruct;
    string[] lottery_result;  //เก็บ address ข้อ Lottery

    // กำหนดค่าเริ่มต้น
    function LotteryRegister(string memory lotteryNo, string memory period) public {
        string memory _address = concatenate(lotteryNo,period); /// PK
        Lottery_ storage lottery = lotteryStruct[_address];
        lottery.lotteryNo = lotteryNo; // หมายเลขของหวย ที่ต้องการซื้อ
        lottery.period = period; // งวดวันที่ 
        lottery.amount = amountMax; // จำนวนว่ามีกี่ใบ
        lottery.listAddress = new address[](0); // address ของคนซื้อ 
     
        lottery_result.push(_address); 
    }

    function get_lottery_result() view public returns (string[] memory) {
        return lottery_result;
    }
    function count_lottery() view public returns (uint) {
        return lottery_result.length;
    }

    function buyingLottery(string memory lotteryNo, string memory period) public{
        // พวกการเช็ค่าต่างๆ ยังไม่ได้ทำ

        string memory _address = concatenate(lotteryNo,period); /// PK
        Lottery_ storage lottery = lotteryStruct[ _address];

        lottery.amount = lottery.amount-1;
        lottery.listAddress.push(msg.sender);
    }

    function geyListLotteryAll() public view returns(string[] memory){
        return lottery_result;
    }

    function geyListLotteryAll2(string memory a) public view returns(Lottery_ memory){
        return lotteryStruct[a];
    }

    function addHistoryBuyingLottery(string memory lotteryNo, string memory period, address buyerAddress) private{
       // Buyer storage buyer = buyerStruct[buyerAddress];
        // buyer.histryLotteryBuyers.push(concatenate(lotteryNo,period));
    } 
    
     // functuion help
    function concatenate(string memory a,string memory b) internal pure returns (string memory){
        return string(abi.encodePacked(a,b));
    } 

    
}

1