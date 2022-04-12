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
        [X] ซื้อตามจะนวนเงินที่ระบุ
    */

    // กำหนดค่า
    uint256 private amountMax = 10; //เลขนั้นมีกี่ีใบ 
    uint256 private limit=2; //ซื้อได้สูงสุด 4 ใบ
    uint256 private LotteryMax=1; //จำนวนตัวเลขของหวย ต่อเลข => (3 ==> 000-999), (2 ==> 00- 99)
    uint private price=80 gwei; //ราคาหวย
    //address payable private walletLottery; // walletกลองกลาง
    address public manager;

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
        manager = msg.sender;
        //walletLottery = payable(msg.sender);
    }



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
    address[] buyer_result;  // เก็บ address ข้อมูลผู้ใช้ทั้งหมด

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
    // ดูว่าแต่ละPeriod เรานั้นซื้อเลขอะไรไปบ้าง
    function getMyLotteryByPeriod(string memory period) view public returns(string[] memory){
        return  buyerStruct[msg.sender].stockListLotteryByPeriod[period];
    } 














    //  Lottery
    struct Lottery_ { 
        string lotteryNo; // หมายเลขหวย
        string period; // ช่วงวันที่ 
        uint256 amount;
        address [] listAddress; // address ของคนซื้อ 
    }
    mapping (string => Lottery_) private lotteryStruct;
    mapping (string => string[]) private listPeriod; // เก็บว่าแต่ละ period มีเลขอะไรบ้าง
    string[] private period_result; // เก็บว่ามี period อะไรบ้าง
    mapping (string => address payable[]) private walletCommonMoney;//  walletกลองกลางของแต่ละงวด
    mapping (string => uint)private commonMoney; // จำนวนเงินกลองกลางของแต่ละงวด

    // กำหนดค่าเริ่มต้น 
    function generateLottery(string memory period) public {
        require(((bytes(period).length==8) ),"period Incorrect"); 

        if(listPeriod[period].length==0){ // period นี้ถูก generate ไปแล้วหรือยัง
            period_result.push(period); // เก็บว่ามี period อะไรบ้าง
            for(uint i=0;i<mathPow(LotteryMax);i++){
                string memory lotteryNo = i==0 ? "0": uintToString(i);    // fubction ที่แปลง uint to string มันมีปัญหาตจรงเลข 0
                string memory _address = concatenate(lotteryNo,period); /// PK
                lotteryStruct[_address].lotteryNo = lotteryNo; // หมายเลขของหวย ที่ต้องการซื้อ
                lotteryStruct[_address].period = period; // งวดวันที่ 
                lotteryStruct[_address].amount = amountMax; // จำนวนว่ามีกี่ใบ
                lotteryStruct[_address].listAddress = new address[](0); // address ของคนซื้อ 

                listPeriod[period].push(lotteryNo);// เก็บว่าแต่ละ period มีเลขอะไรบ้าง
            }
        }
    } 
    function getPeriodAll() view public returns (string[] memory) {
        return period_result;  //จะบอกว่า period อะไรบ้าง 
    }
    function getPeriodDetail(string memory string1) view public returns (string[] memory) {
        return listPeriod[string1]; //จะบอกว่าแต่ละ period มีเลขอะไรบ้าง 
    }
    function getLotteryDetailByAddress(string memory lotteryNo, string memory period) public view returns(Lottery_ memory){
        string memory _address = concatenate(lotteryNo,period); /// PK
        return lotteryStruct[_address]; 
    }


    function buyingLottery(string memory lotteryNo, string memory period) public payable checkRegistor(){
        /*         
            // พวกการเช็คค่าต่างๆ ยังไม่ได้ทำ
            [*] ซื้อเกินlimit ต่อ period หรือไม่ 
            [*] มีเลขนี้อยู่ในระบบหรือไม่ ถ้าไม่มีให้สร้าง
            [*] จำนวน amountของเลขนั้นมันเกินหรือไม่ (เลขนี้หมดไปแล้ว)
        */
        string memory _address = concatenate(lotteryNo,period); /// PK
      
        require(checkNumber(lotteryNo,period) ,"lotteryNo not found"); // check ว่าเลขนี้มีอยู่หรือป่าว
        
        //ซื้อเกินlimit ต่อ period หรือไม่ 
        if(buyerStruct[msg.sender].stockListLotteryByPeriod[period].length >= limit){
            require(false ,"lottery limit"); 
        }

        //เช็คว่าเลขนี้ยังซื้อได้อยู่
        if(lotteryStruct[_address].amount>0){ //ยังมีเหลือ
            
            //require(msg.value == price , "You must pay at least 80 gwei  ");
            require(msg.value == 1 ether , "You must pay at least 1 ether  ");

            lotteryStruct[_address].amount = lotteryStruct[_address].amount-1;
            lotteryStruct[_address].listAddress.push(msg.sender);  // address ของคนซื้อ 
            if(buyerStruct[msg.sender].stockListLotteryByPeriod[period].length==0){
                buyerStruct[msg.sender].myPeriod.push(period);  
            }
            buyerStruct[msg.sender].stockListLotteryByPeriod[period].push(lotteryNo); 
            //walletLottery.transfer(msg.value); // โอนเงินที่ซื้อเข้ากลองกลาง
            walletCommonMoney[period].push(payable(msg.sender));
            commonMoney[period]=commonMoney[period]+msg.value;

        }else{ //เลขนี้หมดไปแล้ว
            require(false ,"not buy"); 
        }
    }
    //check ว่าเลขนี้มีอยู่หรือป่าว
    function checkNumber(string memory lotteryNo, string memory period) public view returns (bool){
        require((!checkStringEqualNull(lotteryNo) && !checkStringEqualNull(period) ),"Incomplete information"); // ป้อนข้อมูลไม่ครบ
        require(((bytes(lotteryNo).length==LotteryMax) ),"lotteryNo Incorrect"); 
        require(((bytes(period).length==8) ),"period Incorrect"); 

        require( IsNumber(lotteryNo),"lotteryNo Incorrect");  // check ว่าเป็นตัวเลขจริงหรือป่าว
        require( IsNumber(period),"period Incorrect");  // check ว่าเป็นตัววันที่จริงหรือป่าว => 20220421 (YYYYMMDD)

        string memory _address = concatenate(lotteryNo,period);
        if( checkStringEqual(lotteryStruct[_address].lotteryNo, lotteryNo)){ // เจอว่ามีเลขนี้อยู่นะ
            return true; 
        }else{
            return false; 
        }
    }
    //check ว่าเลขนี้มีอยู่หรือป่าวและยังซื้อได้อยู่หรือป่าว
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



    // ออก รางวัล


    struct award { 
        uint Balance;   // จำนวนเงินทั้งหมด
        uint BalancePerAddress;     // จำนวนเงินทั้งหมด มาหาร จำนวน address => ก็จะได้เป็นว่า address จะได้เงินจำนวนเท่าไหร่
        bool isAwarding; // true ออกไปแล้ว
        string lotteryStruct; // เลขที่ออก
        address [] listAddress;// address ของผู้ที่เคยถูกรางวัล
    }
    mapping (string => award) private Award;

    function getBalance(string memory period) public view returns(uint) {
        return commonMoney[period];
    }
    function random2(string memory period) private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, walletCommonMoney[period].length)));
    }
    function pickWinner(string memory period) public { // โอนเงินเมื่อถูกรางวัล
        require(msg.sender == manager,"only meneger");
        require(((bytes(period).length==8) ),"period Incorrect"); 
        require((getPeriodDetail(period).length!=0 ),"period not found"); 

        uint r = random2(period);
        address payable winner;
        uint index = r % walletCommonMoney[period].length;
        winner = walletCommonMoney[ period][index];
        winner.transfer(getBalance(period)/2);

        uint r2 = random2(period);
        address payable winner2;
        uint index2 = r2 % walletCommonMoney[period].length;
        winner2 = walletCommonMoney[ period][index2];
        winner2.transfer(getBalance(period)/2);

        walletCommonMoney[ period] = new address payable[](0);
        commonMoney[period]=0;
    }

    function awarding2(string memory period) public{
        require(((bytes(period).length==8) ),"period Incorrect"); 
        if(listPeriod[period].length==0){
            require(false ,"period error"); 
        }
        require(!Award[period].isAwarding ,"Awarded"); // ออกรางวัลไปแล้ว
        

        
        // เอาเแพาะเลขที่ขายไปแล้วมา random  
        // https://stackoverflow.com/questions/69038767/solidity-returnsstring-memory-wont-permit-return-of-string5
        uint num=0;
        for(uint i=0;i<listPeriod[period].length;i++){
            string memory _address1 = concatenate(listPeriod[period][i],period); /// PK
            //randomLotteryNo.push(_address1);
             if(lotteryStruct[_address1].amount !=  amountMax){
                // มีการซื้อขายไปแล้ว
                 num= num+1;
            }  
        }
        uint j=0;
        string[] memory randomLotteryNo = new string[](num); 
        for(uint i=0;i<listPeriod[period].length;i++){
            string memory _address1 = concatenate(listPeriod[period][i],period); /// PK
             if(lotteryStruct[_address1].amount !=  amountMax){
                // มีการซื้อขายไปแล้ว
                randomLotteryNo[j]=_address1;    
                j=j+1;     
            }  
        }
        
        
     
        uint random1 = random(num);
        uint Balance = getBalance(period); //จำนวนเงินทั้งหมด
        uint BalancePerAddress= Balance/lotteryStruct[randomLotteryNo[random1]].listAddress.length;  //จำนวนเงินทั้งหมด มาหาร จำนวน address => ก็จะได้เป็นว่า address จะได้เงินจำนวนเท่าไหร่
        Award[period].isAwarding=true;
        Award[period].Balance=Balance;
        Award[period].BalancePerAddress=BalancePerAddress;
        Award[period].listAddress= lotteryStruct[randomLotteryNo[random1]].listAddress;
        Award[period].lotteryStruct=randomLotteryNo[random1];

        for(uint i=0;i<lotteryStruct[randomLotteryNo[random1]].listAddress.length;i++){
           for(uint k=0; k< walletCommonMoney[period].length; k++){
               if(lotteryStruct[randomLotteryNo[random1]].listAddress[i] == walletCommonMoney[period][k]){
                    address payable winner;
                    winner=walletCommonMoney[period][k];
                    winner.transfer(BalancePerAddress);
                    k=walletCommonMoney[period].length+1;
               }
           }
        }   

        walletCommonMoney[ period] = new address payable[](0);
        commonMoney[period]=0;







    }
     function getAward(string memory period) view public returns (award memory){
        return Award[period];
     }





    //////// functuion help
    function concatenate(string memory a,string memory b) internal pure returns (string memory){
        return string(abi.encodePacked(a,b));
    } 
    function getMyaddress() public view returns(address){
        return msg.sender;
    }
    function getMyBalance() public view returns(uint) {
        return msg.sender.balance; 
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
    function mathPow(uint number) private pure returns(uint){
        return 10**number;
    }

    // fubction ที่แปลง uint to string มันมีปัญหาตจรงเลข 0
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