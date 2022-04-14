const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/Lottery.sol/Lottery.json");
console.log(JSON.stringify(contract.abi));

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "ropsten"),
  API_KEY
);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function main() {
  const message = await helloWorldContract.manager();
  console.log("The message is: " + message);
}
main();
