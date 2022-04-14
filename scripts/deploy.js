async function main() {
    const Lottery = await ethers.getContractFactory("Lottery");
 
    // Start deployment, returning a promise that resolves to a contract object
    const lottery_thai = await Lottery.deploy();   
    console.log("Contract deployed to address:", lottery_thai.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
