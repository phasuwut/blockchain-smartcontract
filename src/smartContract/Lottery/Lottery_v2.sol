// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


/** 
 * @title Lottery
 * @dev Implements voting process along with vote delegation
 */
contract Lottery {

    /* 
        [*] เหลือพวกเช็คว่าเป็นวันที่จริงหรือป่าว ตัวเลขจริงหรือป่าว  Period =>  (YYYYMMDD)
        [] โอนเงินเมื่อถูกรางวัน
        [X] ออกเลข
        [X] listReward
    */


    constructor() {
        // กำหนดค่า
        listReward.push(Reward(
            {   
                name:"reward-1",// "รางวันที่1",
                price: 1000
            }
        ));
        listReward.push(Reward(
            {   
                name:"reward-2",// "รางวันที่/",
                price: 50
            }
        ));
    }

    uint256 private amountMax = 10; //ชุดละกี่ีใบ
    uint256 private limit=2; //ซื้อได้สูงสุด 4 ใบ
    uint256 private LotteryMax=3; //จำนวนตัวเลขของหวย ต่อเลข => (3 ==> 000-999), (2 ==> 00- 99)
    /*     
        uint private pricex=80; //ราคาหวย
    */

    // Reward
    struct Reward{ // รางวัล
        string name; //ชื่อรางวัน
        uint price; ///เงินรางวัน
    }
    Reward[] private listReward; // เก็บว่ามีรางวันอะไรบ้าง
    function getListReward() public view returns(Reward[] memory){
        return listReward;
    }
    function awarding(string memory period) public view returns(string memory){
        require(((bytes(period).length==8) ),"period Incorrect"); 
        if(listPeriod[period].length==0){
            require(false ,"period error"); 
        }
        uint random1 = random(listPeriod[period].length);

        string memory _address = concatenate(period,listPeriod[period][random1]); 
        return  _address;
    }
 



    //ข้อมูลผู้ใช้
    struct Buyer { 
        string firstName;
        string lastName;
        string email;
        mapping (string => string[])  stockListLotteryByPeriod; //เอาไว้เก็บว่าเรานั้นซื้อเลขใดไปบ้าง โดยใช้เลขPeriod เป็น index
        string [] myPeriod; //เก็บว่าเราน้ันซื้อ Period ไหนไปบ้าง
    }
    mapping (address => Buyer) private buyerStruct;
    address[] buyer_result;  // เก็บ address ข้อมูลผู้ใช้

    function buyersRegister(string memory firstName, string memory lastName,string memory email) public {
        // firstName, lastName, email ต้องไม่เป็นค่าว่าง
        require((!checkStringEqualNull(firstName) && !checkStringEqualNull(lastName) && !checkStringEqualNull(email)),"Incomplete information"); // ป้อนข้อมูลไม่ครบ

        // check ว่าลงทะเบียนไปแล้วหรือยัง
        require(checkStringEqualNull(buyerStruct[msg.sender].email), "Registered");

        buyerStruct[msg.sender].firstName = firstName;
        buyerStruct[msg.sender].lastName = lastName;
        buyerStruct[msg.sender].email = email;

        buyer_result.push(msg.sender);
    }
    modifier checkRegistor() {
       require(!checkStringEqualNull(buyerStruct[msg.sender].email), "Please register");
        _;
    }
    function get_buyer_result() view public returns (address[] memory) {
        return buyer_result; // ดู address ของ buyer ทั้งหมด
    }
    function count_buyers() view public returns (uint) {
        return buyer_result.length;
    }
    function getDetailBuyerByAddress(address address1) view public returns(string memory, string memory,string memory,string[] memory){
       return  (buyerStruct[address1].firstName, buyerStruct[address1].lastName ,buyerStruct[address1].email  , buyerStruct[address1].myPeriod);
    }
    function getMyDetailBuyer() view public returns(string memory, string memory,string memory,string[] memory){
        return  (buyerStruct[msg.sender].firstName, buyerStruct[msg.sender].lastName, buyerStruct[msg.sender].email, buyerStruct[msg.sender].myPeriod);
    } 
    function getMyLotteryByPeriod(string memory period) view public returns(string[] memory){
        return  buyerStruct[msg.sender].stockListLotteryByPeriod[period];
    }


    //  Lottery
    struct Lottery_ { // ข้อมูล
        string lotteryNo; // หมายเลขหวย
        string period; // ช่วงวันที่ 
        uint256 amount;
        address [] listAddress; // address ของคนซื้อ 
    }
    mapping (string => Lottery_) private lotteryStruct;
    mapping (string => string[]) private listPeriod; // เก็บว่าแต่ละงวดมีเลขอะไรบ้าง
    string[] private period_result; // เก็บว่ามี period อะไรบ้าง

    // กำหนดค่าเริ่มต้น 
    function LotteryRegister(string memory lotteryNo, string memory period) private {
        string memory _address = concatenate(lotteryNo,period); /// PK

        lotteryStruct[_address].lotteryNo = lotteryNo; // หมายเลขของหวย ที่ต้องการซื้อ
        lotteryStruct[_address].period = period; // งวดวันที่ 
        lotteryStruct[_address].amount = amountMax; // จำนวนว่ามีกี่ใบ
        lotteryStruct[_address].listAddress = new address[](0); // address ของคนซื้อ 
      
        if(listPeriod[period].length==0){
            period_result.push(period);
        }
        listPeriod[period].push(lotteryNo);
    }

    function getPeriodResult() view public returns (string[] memory) {
        return period_result;
    }
    function getPeriodResult(string memory string1) view public returns (string[] memory) {
        return listPeriod[string1];
    }

    function getDetailLotteryByIndex(string memory index1) public view returns(Lottery_ memory){
        return lotteryStruct[index1];
    }


    function buyingLottery(string memory lotteryNo, string memory period) public checkRegistor(){
        /*         
            // พวกการเช็คค่าต่างๆ ยังไม่ได้ทำ
            [*] ซื้อเกินlimit ต่อ period หรือไม่ 
            [*] มีเลขนี้อยู่ในระบบหรือไม่ ถ้าไม่มีให้สร้าง
            [*] จำนวน amountของเลขนั้นมันเกินหรือไม่ (เลขนี้หมดไปแล้ว)
        */
        string memory _address = concatenate(lotteryNo,period); /// PK
      
        //ซื้อเกินlimit ต่อ period หรือไม่ 
        if(buyerStruct[msg.sender].stockListLotteryByPeriod[period].length >= limit){
            require(false ,"lottery limit"); 
        }

        // มีเลขนี้อยู่ในระบบหรือไม่ ถ้าไม่มีให้สร้าง
        if(checkNumberAndGenerateLottery(lotteryNo,period)){  // กรณีที่มีเลขนี้แล้ว
            if(lotteryStruct[_address].amount>0){ //เช็คว่าเลขนี้ยังซื้อได้อยู่
                lotteryStruct[_address].amount = lotteryStruct[_address].amount-1;
                lotteryStruct[_address].listAddress.push(msg.sender);  // address ของคนซื้อ 
                if(buyerStruct[msg.sender].stockListLotteryByPeriod[period].length==0){
                    buyerStruct[msg.sender].myPeriod.push(period);  
                }
                buyerStruct[msg.sender].stockListLotteryByPeriod[period].push(lotteryNo); 
            }else{ //เลขนี้หมดไปแล้ว
                require(false ,"not buy"); 
            }

        }else{  // กรณีที่ยังไม่มีเลขนี้
            lotteryStruct[_address].amount = lotteryStruct[_address].amount-1;
            lotteryStruct[_address].listAddress.push(msg.sender);  // address ของคนซื้อ 
            if(buyerStruct[msg.sender].stockListLotteryByPeriod[period].length==0){
                buyerStruct[msg.sender].myPeriod.push(period);  
            }
            buyerStruct[msg.sender].stockListLotteryByPeriod[period].push(lotteryNo);
        }
    }

    //check ว่าเลขนี้มีอยู่หรือป่าว
    function checkNumber(string memory lotteryNo, string memory period) public view returns (bool){
        require((!checkStringEqualNull(lotteryNo) && !checkStringEqualNull(period) ),"Incomplete information"); // ป้อนข้อมูลไม่ครบ
        require(((bytes(lotteryNo).length==LotteryMax) ),"lotteryNo Incorrect"); 
        require(((bytes(period).length==8) ),"period Incorrect"); 

        require( IsNumber(lotteryNo),"lotteryNo Incorrect");  // check ว่าเป็นตัวเลขจริงหรือป่าว
        require( IsNumber(period),"period Incorrect");  // check ว่าเป็นตัววันที่จริงหรือป่าว => 20220421 (YYYYMMDD)


        // เหลือพวก มันเป็นวันที่จริงหรือป่าว ตัวเลขจริงหรือป่าว

        string memory _address = concatenate(lotteryNo,period);
        if( checkStringEqual(lotteryStruct[_address].lotteryNo, lotteryNo)){ // เจอว่ามีเลขนี้อยู่นะ
            return true; 
        }else{
            return false; 
        }
    }
    //check ว่าเลขนี้มีอยู่หรือป่าว และยังซื้อได้อยู่หรือป่าว
    function checkNumberAndBuy(string memory lotteryNo, string memory period) public view returns (bool){
        if(checkNumber(lotteryNo,period)){
            string memory _address = concatenate(lotteryNo,period);
            if(lotteryStruct[_address].amount>0){
                return true; 
            }else{
                return false; 
            }
        }else{
            return false; 
        }  
    }
    //check ว่าเลขนี้มีอยู่หรือป่าว ถ้าไม่มีให้สร้างขึ้นมาใหม่ แต่ต้ามสร้างเกินเลขที่กำหนดไว่า
    function checkNumberAndGenerateLottery(string memory lotteryNo, string memory period) private returns (bool){
        if(checkNumber(lotteryNo,period)){
            return true;
        }else{
            LotteryRegister(lotteryNo,period); // create lottery
            return false;
        }
    }





    //////// functuion help
    function concatenate(string memory a,string memory b) internal pure returns (string memory){
        return string(abi.encodePacked(a,b));
    } 
    function getMyaddress() view public returns(address){
        return msg.sender;
    }

    // string1==""
    function checkStringEqualNull(string memory string1) private pure returns (bool){ // string1==""
        if(bytes(string1).length == 0){
            return true;
        }
        return false;
    }

    // string1== string2
    function checkStringEqual(string memory string1, string memory string2) private pure returns (bool){ 
        if( keccak256(abi.encodePacked(string1)) == keccak256(abi.encodePacked(string2)) ){
            return true;
        }
         return false;
    }

    // random number. 0-n
    function random(uint number) private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % number;
    }
// function checkDate(string memory date)public view returns(bool){
//     require false;
// }

    function uintToString(uint v) private pure returns (string memory) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i); // i + 1 is inefficient
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - j - 1]; // to avoid the off-by-one error
        }
        string memory str = string(s);  // memory isn't implicitly convertible to storage
        return str;
    }

    function IsNumber(string memory str) private pure returns (bool){
        bytes memory b = bytes(str);
        if(b.length > 13) return false;

        for(uint i; i<b.length; i++){
            bytes1 char = b[i];

            if(
                !(char >= 0x30 && char <= 0x39)  //9-0
            ){
                return false;
            }
            /*         
                    if(
                        !(char >= 0x30 && char <= 0x39) && //9-0
                        !(char >= 0x41 && char <= 0x5A) && //A-Z
                        !(char >= 0x61 && char <= 0x7A) && //a-z
                        !(char == 0x2E) //.
                    ){
                        return false;
                    }
            */ 
        }

        return true;
    }



}


