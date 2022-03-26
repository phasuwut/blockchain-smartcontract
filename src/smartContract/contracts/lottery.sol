// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Owner
 * @dev Set & change owner
 */
contract Lottery {

    struct registor { // ข้อมูลของผู้ใช้
        bytes32 fullName; 
        bytes32 tel;
        bytes32 email;
        address addressBuyer;
    }

    struct listLottery { // lottery แต่ละใบ
        bytes32 number; //หมายเลข
        bytes32 period; //(งวดวันที่ 16022565)
        address addressLottery;

    }

    struct stockListLottery{
        bytes32 number; //หมายเลข
        uint total;
        address[] addressLottery;
    }

    struct buyingLottery{  //การซื้อLotteryในแต่ละครั้ง
        bytes32 date;// วันที่
        address[] addressLottery; //array
        address addressBuyer; //address ของผู้ซื้อ

        address addressBuyingLottery;  // ของการซื้อLotteryในแต่ละครั้ง
    }


    function registor(bytes32 fullName, bytes32 tel, bytes32 email)public {
    }
    function buyLottery(bytes32[] number)public{ //
    }
    function checkLottery(bytes32  number)public{ // เช็คว่าซื้อไปหรือยัง
    }
    function rewardCheck(bytes32 number,  bytes32 period)public{  // เช็ครางวัล
    }
    function showHistory(address addressBuyingLottery)public{
    }


    struct reward{
        bytes32 name; //ชื่อรางวัน
        uint price; ///เงินรางวัน
    }
    struct listReward{ 
        reward[] reward;
        /* 
            [
                {
                    name:รางวันที่1  ,
                    price:1000
                },
                {
                    name:รางวันที่2  ,
                    price:50
                }
            ]
        */
    }

    struct winLottery{
        bytes32 number; //หมายเลข
        bytes32 period; //(งวดวันที่ 16022565)
        reward reward;
    }
    struct listWinLottery{
        winLottery[] winLottery;
        address addressListWinLottery;
        /*         [
                    {   
                        number: 11,
                        period:งวดวันที่ 16022565,
                        reward:{
                            name:รางวันที่1  ,
                            price:1000
                        },
                    },
                        {   
                        number: 00,
                        period:งวดวันที่ 16022565,
                        reward:{
                            name:รางวันที่2 ,
                            price:50
                        },
                    },
                ]
        */
    }

    function การออกสลาก(){

    }
    function การออกรางวัน(){

    }
}

       