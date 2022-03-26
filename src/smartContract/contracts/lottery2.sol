// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Owner
 * @dev Set & change owner
 */
contract LotteryThai { // รอบนึง
    uint private LotteryMax=10; //จำนวนเลขของหวย
    uint private pricex=80; //ราคาหวย
    uint private limit=2; //ซื้อได้สูงสุด 4 ใบ
    address payable private owner; // addressของเจ้าของเจ้าของsmartContract นี้
    
    function getBalanceOwner() public view returns(uint256){ // จำนวนเงินของเจ้าของsmartContract นี้
        return owner.balance;
    }

    constructor() payable{
        // กำหนดค่า
            listReward.push(Reward(
                {   
                    name:"reward-1",// "รางวันที่1",
                    price: 1000
                }
            ));
            listReward.push(Reward(
                {   
                    name:"reward-2",// "รางวันที่1",
                    price: 50
                }
            ));

            generateStockListLottery();
            owner = payable(msg.sender);
    }

    struct Reward{ // รางวัล
        string name; //ชื่อรางวัน
        uint price; ///เงินรางวัน
    }
    Reward[] public listReward;
    function getListReward() public view returns(Reward[] memory){
        return listReward;
    }


    struct Lottery {   //lottery แต่ละใบ
        uint number; //หมายเลข
        string period; //(งวดวันที่ 16022565)
        address whoBuy; // ใครเป็นคนซื้อ
        bool isBuy; //  เลขนี้ซื้อไปยัง
    }
    Lottery[] public stockListLottery;
    function getStockListLotteryAll() public view returns(Lottery[] memory){
        return stockListLottery;
    }
    function generateStockListLottery() private {
       for(uint i=0;i<LotteryMax;i++){
            stockListLottery.push(Lottery(
                {   
                    number: i,
                    period:"16022565",
                    whoBuy: address(0), //default
                    isBuy:  i%2==0? true:false
                }
            ));
       }
    }
    function checkLotteryByNumberIsBuy(uint number)public view returns(bool){ // เช็คว่าเลขนี้ถูกซื้อไปแล้วหรือยัง ถ้าขายไปแล้ว true ถ้าไม่ได้ขาย false
        for(uint i=0;i<stockListLottery.length; i++){
            if(stockListLottery[i].number == number){
                if(!stockListLottery[i].isBuy){
                    return false;
                }
            }
        }
       return true; 
    }
    function checkLotteryByNember(uint number) public view returns(bool){ //check ว่าเลขนี้มีอยู่หรือป่าว. ถ้าเจอ true ถ้าไม่เจอ false
        for(uint i=0;i<stockListLottery.length;i++){
            if(stockListLottery[i].number==number){    
                return true;
            }
        }
        return false;
    }


    struct BuyingLottery{  //การซื้อLotteryในแต่ละครั้ง
        string date;// วันที่
        uint indexStockListLottery;//indexของstockListLottery   ที่ซื้อ
    }
    struct User{
        string fullName;
        address addressUser;
        BuyingLottery[] myHistoryListBuyingLottery;// เก็บว่าเรานั้นซื้ออะไรไปบ้าง
    }
    mapping(address => User) public users;
    address[] public listUserAll; // เก็บว่า user นี้ลงทำเบียนไปแล้วหรือยัง

    function getDetailUserByAddress(address address1) public view returns(User memory ) {
        return users[address1];
    }   
    function getMyDetail() public view returns(User memory ) {
        return users[msg.sender];
    }  
    function getAddressUserAll() public view returns(address[] memory ) {
        return listUserAll;
        //revert('Not found');
    }
    function Registor(string memory fullName) public{
        require(!checkIsRegistor(msg.sender), "Registor "); //ลงทำเบียนแล้ว
        users[msg.sender].addressUser=msg.sender;
        users[msg.sender].fullName=fullName;
        listUserAll.push(msg.sender);
    }
    function chnageFullName(string memory fullName) public{
        require(checkIsRegistor(msg.sender), "not Registor "); 
        users[msg.sender].fullName=fullName;
    }
    function checkIsRegistor(address address2 ) public view returns(bool){// check ว่าลงทำเบียนไปแล้ว หรือยัง
        for(uint i=0;i<listUserAll.length;i++){ 
            if(address2==listUserAll[i]){
                return true;   
            }
        }
        return false;   
    }


    function buyLottery(uint[] memory number) public payable {  
        require(checkIsRegistor(msg.sender), "not Registor ");

        // check ว่าเลขนี้มีอยู่หรือป่าว
        for(uint i=0;i<number.length;i++){ 
            require(checkLotteryByNember(number[i]), "not buy1");
        }
       //check ว่าเลขนี้ซื้อไปยัง
        for(uint i=0;i<number.length;i++){ 
            require(!checkLotteryByNumberIsBuy(number[i]), "not buy2");
        }
        // เช็คว่าซื้อเกินหรือป่าว
        require(users[msg.sender].myHistoryListBuyingLottery.length<limit, "limit");

        // เช็คยอดเงิน

       // uint256 balance = msg.sender.balance; //จำนวนเงินของผู้ซื้อ

  
   
        //มโนว่าโอนเงินเงินพอ
        BuyingLottery[] storage arr1 = users[msg.sender].myHistoryListBuyingLottery; 
        for(uint i=0;i<number.length;i++){ 
            for(uint j=0;j<stockListLottery.length; j++){
                if(number[i] ==stockListLottery[j].number){ 
                    stockListLottery[j].whoBuy=msg.sender;
                    stockListLottery[j].isBuy=true;
                    arr1.push(BuyingLottery(
                        {
                            date:"test",
                            indexStockListLottery:j
                        }
                    ));
                }      
            }
        }
        users[msg.sender].myHistoryListBuyingLottery=arr1;
    }



}
/* 
//test
 function transferEther() public payable {
       // address(owner).transfer(_amount);

        // msg.sender.send(111);
        // msg.sender.transfer();

       // owner.call.value(1).gas(2300);
        msg.sender.call{value:100 ether };

    } */