// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


/** 
 * @title Lottery
 * @dev Implements voting process along with vote delegation
 */
contract Lottery {

    /* 
        [] เหลือพวกเช็คว่าเป็นวันที่จริงหรือป่าว ตัวเลขจริงหรือป่าว
        [] โอนเงินเมื่อถูกรางวัน
        [] ออกเลข
    */

    uint256 private amountMax = 10; //จำนวนชุด
    uint256 private limit=2; //ซื้อได้สูงสุด 4 ใบ
    uint256 private LotteryMax=3; //จำนวนตัวเลขของหวย ต่อเลข
    /*     
        uint private pricex=80; //ราคาหวย
    */

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
    string[] private period_result;

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
            if(lotteryStruct[ _address].amount>0){ //เช็คว่าเลขนี้ยังซื้อได้อยู่
                lotteryStruct[ _address].amount = lotteryStruct[ _address].amount-1;
                lotteryStruct[ _address].listAddress.push(msg.sender);  // address ของคนซื้อ 
                if(buyerStruct[msg.sender].stockListLotteryByPeriod[period].length==0){
                    buyerStruct[msg.sender].myPeriod.push(period);  
                }
                buyerStruct[msg.sender].stockListLotteryByPeriod[period].push(lotteryNo); 
            }else{ //เลขนี้หมดไปแล้ว
                require(false ,"not buy"); 
            }

        }else{  // กรณีที่ยังไม่มีเลขนี้
            lotteryStruct[ _address].amount = lotteryStruct[ _address].amount-1;
            lotteryStruct[ _address].listAddress.push(msg.sender);  // address ของคนซื้อ 
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

// function checkDate(string memory date)public view returns(bool){
//     require false;
// }

}


