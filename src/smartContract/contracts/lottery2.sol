// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Owner
 * @dev Set & change owner
 */
contract LotteryThai { // รอบนึง
    uint private LotteryMax=10; //จำนวนเลขของหวย
    uint private pricex=80; //ราคาหวย
    uint private limit=4; //ซื้อได้สูงสุด 4 ใบ

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
                    name:"reward-2",// "รางวันที่1",
                    price: 50
                }
            ));

            generateStockListLottery();

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
        bytes32 date;// วันที่
        Lottery lottery;// Lottery ที่ซื้อ
    }
    struct User{
        string fullName;
        address addressUser;
        BuyingLottery[] myHistoryListBuyingLottery;// เก็บว่าเรานั้นซื้ออะไรไปบ้าง
    }
    mapping(address => User) public users;
    address[] public listUserAll;

    function getDetailUserByAddress(address address1) public view returns(User memory ) {
        return users[address1];
    }  
    function getAddressUserAll() public view returns(address[] memory ) {
        return listUserAll;
        //revert('Not found');
    }
    function Registor(address address1, string memory fullName) public{
        users[address1].addressUser=address1;
        users[address1].fullName=fullName;

        listUserAll.push(address1);
    }


    function buyLottery(uint[] memory number) public payable {  
        // check ว่าเลขนี้มีอยู่หรือป่าว
        for(uint i=0;i<number.length;i++){ 
            require(checkLotteryByNember(number[i]), "not buy1");
        }
       //check ว่าเลขนี้ซื้อไปยัง
        for(uint i=0;i<number.length;i++){ 
            require(!checkLotteryByNumberIsBuy(number[i]), "not buy2");
        }
        // เช็คยอดเงิน


        //มโนว่าโอนเงินเงินพอ
       for(uint i=0;i<number.length;i++){ 
            for(uint j=0;j<stockListLottery.length; j++){
                if(number[i] ==stockListLottery[j].number){ 
                    stockListLottery[j].whoBuy=msg.sender;
                    stockListLottery[j].isBuy=true;
                } 
            }
        }
    }

    // struct Registor { // ข้อมูลของผู้ใช้
    //     string fullName; 
    //     string tel;
    //     string email;
    //     address addressBuyer;
    // }
    // Registor[] private listRegistor; // เป็นarray ที่เก็บข้อมูลของผู้ใช้ทั้งหมด




    // struct Lottery {   //lottery แต่ละใบ
    //     uint number; //หมายเลข
    //     string period; //(งวดวันที่ 16022565)
    //     address whoBought; // ใครเป็นคนซื้อ
    // }
    // Lottery[] public stockListLottery;

    // mapping(address => Lottery) public myBuyingLottery;



    // function getListReward() public view returns(Reward[] memory){
    //     return listReward;
    // }

    // function getStockListLottery() public view returns(Lottery[] memory){
    //     return stockListLottery;
    // }
    // function generateStockListLottery() private {
    //    for(uint i=0;i<LotteryMax;i++){
    //         stockListLottery.push(Lottery(
    //             {   
    //                 number: i,
    //                 period:"16022565",
    //                 whoBought: address(0)
    //             }
    //         ));
    //    }
    // }

    // function getBuyingLottery() public view returns(Lottery memory){ 
    //     return myBuyingLottery[msg.sender];
    // }
}



// contract Lottery {

//     struct registor { // ข้อมูลของผู้ใช้
//         bytes32 fullName; 
//         bytes32 tel;
//         bytes32 email;
//         address addressBuyer;
//     }

//     struct listLottery { // lottery แต่ละใบ
//         bytes32 number; //หมายเลข
//         bytes32 period; //(งวดวันที่ 16022565)
//         address addressLottery;

//     }

//     struct stockListLottery{
//         bytes32 number; //หมายเลข
//         uint total;
//         address[] addressLottery;
//     }

//     struct buyingLottery{  //การซื้อLotteryในแต่ละครั้ง
//         bytes32 date;// วันที่
//         address[] addressLottery; //array
//         address addressBuyer; //address ของผู้ซื้อ

//         address addressBuyingLottery;  // ของการซื้อLotteryในแต่ละครั้ง
//     }


//     function registor(bytes32 fullName, bytes32 tel, bytes32 email)public {
//     }
//     function buyLottery(bytes32[] number)public{ //
//     }
//     function checkLottery(bytes32  number)public{ // เช็คว่าซื้อไปหรือยัง
//     }
//     function rewardCheck(bytes32 number,  bytes32 period)public{  // เช็ครางวัล
//     }
//     function showHistory(address addressBuyingLottery)public{
//     }


//     struct reward{
//         bytes32 name; //ชื่อรางวัน
//         uint price; ///เงินรางวัน
//     }
//     struct listReward{ 
//         reward[] reward;
//         /* 
//             [
//                 {
//                     name:รางวันที่1  ,
//                     price:1000
//                 },
//                 {
//                     name:รางวันที่2  ,
//                     price:50
//                 }
//             ]
//         */
//     }

//     struct winLottery{
//         bytes32 number; //หมายเลข
//         bytes32 period; //(งวดวันที่ 16022565)
//         reward reward;
//     }
//     struct listWinLottery{
//         winLottery[] winLottery;
//         address addressListWinLottery;
//         /*         [
//                     {   
//                         number: 11,
//                         period:งวดวันที่ 16022565,
//                         reward:{
//                             name:รางวันที่1  ,
//                             price:1000
//                         },
//                     },
//                         {   
//                         number: 00,
//                         period:งวดวันที่ 16022565,
//                         reward:{
//                             name:รางวันที่2 ,
//                             price:50
//                         },
//                     },
//                 ]
//         */
//     }

//     function การออกสลาก(){

//     }
//     function การออกรางวัน(){

//     }
// }

       
       