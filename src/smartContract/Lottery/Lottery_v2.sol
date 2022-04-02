// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


/** 
 * @title Lottery
 * @dev Implements voting process along with vote delegation
 */
contract Lottery {
    uint private amountMax = 10; //จำนวนชุด
    uint private limit=2; //ซื้อได้สูงสุด 4 ใบ
    uint private LotteryMax=15; //จำนวนเลขของหวย ต่อเลข
    /*     

        uint private pricex=80; //ราคาหวย
       
    */

    //ข้อมูลผู้ใช้
    struct Buyer { 
        string firstName;
        string lastName;
        string email;
        string [] stockListLottery; // เอาไว้เก็บว่าเราซื้อเลขใดไปบ้าง
    }
    mapping (address => Buyer) public buyerStruct;
    address[] buyer_result;  // เก็บ address ข้อมูลผู้ใช้

    function buyersRegister(string memory firstName, string memory lastName,string memory email) public {
        // firstName, lastName, email ต้องไม่เป็นค่าว่าง
    
       
        require(!checkStringEqualNull(email), "firstName !== null"); 
        require(!checkStringEqualNull(lastName), "lastName !== null");  
        require(!checkStringEqualNull(email), "email !== null"); 

        buyerStruct[msg.sender].firstName = firstName;
        buyerStruct[msg.sender].lastName = lastName;
        buyerStruct[msg.sender].email = email;

        buyer_result.push(msg.sender);
    }
    function get_buyer_result() view public returns (address[] memory) {
        return buyer_result; // ดู address ของ buyer ทั้งหมด
    }
    function count_buyers() view public returns (uint) {
        return buyer_result.length;
    }
    function getDetailBuyerByAddress(address address1)  view public returns(Buyer memory){
        return buyerStruct[address1];
    }
    function getMyDetailBuyer()  view public returns(Buyer memory){
        return buyerStruct[msg.sender];
    }
    modifier checkRegistor() {
       require(!checkStringEqualNull(buyerStruct[msg.sender].email), "Please register");
        _;
    }




    //  Lottery
    struct Lottery_ { // ข้อมูล
        string lotteryNo; // หมายเลขหวย
        string period; // ช่วงวันที่ 
        uint amount;
        address [] listAddress; // address ของคนซื้อ 
    }

    mapping (string => Lottery_) public lotteryStruct;
    string[] lottery_result;  //เก็บ address ข้อ Lottery


    // กำหนดค่าเริ่มต้น 
    function LotteryRegister(string memory lotteryNo, string memory period) private {
        string memory _address = concatenate(lotteryNo,period); /// PK

        lotteryStruct[_address].lotteryNo = lotteryNo; // หมายเลขของหวย ที่ต้องการซื้อ
        lotteryStruct[_address].period = period; // งวดวันที่ 
        lotteryStruct[_address].amount = amountMax; // จำนวนว่ามีกี่ใบ
        lotteryStruct[_address].listAddress = new address[](0); // address ของคนซื้อ 
     
        lottery_result.push(_address); 
    }
    function get_lottery_result() view public returns (string[] memory) {
        return lottery_result;
    }
    function getDetailLotteryById(string memory a) public view returns(Lottery_ memory){
        return lotteryStruct[a];
    }
    function count_lottery() view public returns (uint) {
        return lottery_result.length;
    }

    function buyingLottery(string memory lotteryNo, string memory period) public checkRegistor(){
        // พวกการเช็ค่าต่างๆ ยังไม่ได้ทำ
        require(!checkStringEqualNull(period), "period !== null"); 
        require(!checkStringEqualNull(lotteryNo), "lotteryNo !== null"); 


        //require(!checkNumber(lotteryNo,period), "not buy2");

        string memory _address = concatenate(lotteryNo,period); /// PK
       
        lotteryStruct[ _address].amount = lotteryStruct[ _address].amount-1;
        lotteryStruct[ _address].listAddress.push(msg.sender);  // address ของคนซื้อ 
        buyerStruct[msg.sender].stockListLottery.push(_address); // คนซื้อเก็บว่าซื้ออะไรไปบ้าง
    }

    //check ว่าเลขนี้มีอยู่หรือป่าว
    function checkNumber(string memory lotteryNo, string memory period) public view returns (bool){
        if(st2num(lotteryNo)>LotteryMax){ 
            return false;
        }else if(st2num(lotteryNo)==0){
            return false;
        }

        string memory _address = concatenate(lotteryNo,period);
        if( checkStringEqual(lotteryStruct[_address].lotteryNo,lotteryNo)){ // เจอว่ามีเลขนี้อยู่นะ
            return true; 
        }else{
            return false; 
        }
    }

    //check ว่าเลขนี้มีอยู่หรือป่าว ถ้าไม่มีให้สร้างขึ้นมาใหม่ แต่ต้ามสร้างเกินเลขที่กำหนดไว่า
    function checkNumberAndGenerateLottery(string memory lotteryNo, string memory period) private returns (bool){
        if(checkNumber(lotteryNo,period)){
             LotteryRegister(lotteryNo,period);
             return true;
        }else{
            return false;
        }
    }





   /// check ว่าเลขนี้ถูกซื้อไปยัง
 




    
    //////// functuion help
    function concatenate(string memory a,string memory b) internal pure returns (string memory){
        return string(abi.encodePacked(a,b));
    } 
    function getMyaddress() view public returns(address){
        return msg.sender;
    }
    function checkStringEqualNull(string memory string1) public pure returns (bool){ 
        if( keccak256(abi.encodePacked(string1)) == keccak256(abi.encodePacked("")) ){
            return true;
        }
         return false;
    }
    function checkStringEqual(string memory string1, string memory string2) public pure returns (bool){ 
        if( keccak256(abi.encodePacked(string1)) == keccak256(abi.encodePacked(string2)) ){
            return true;
        }
         return false;
    }
    function st2num(string memory numString) public pure returns(uint) {
        uint  val=0;
        bytes   memory stringBytes = bytes(numString);
        for (uint  i =  0; i<stringBytes.length; i++) {
            uint exp = stringBytes.length - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
           uint jval = uval - uint(0x30);
   
           val +=  (uint(jval) * (10**(exp-1))); 
        }
      return val;
    }

}


