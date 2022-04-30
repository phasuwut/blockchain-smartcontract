async function main() {
  const Lottery = await ethers.getContractFactory("Lottery");

  // Start deployment, returning a promise that resolves to a contract object
  const lottery = await Lottery.deploy();
  console.log("Contract deployed to address:", lottery.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
