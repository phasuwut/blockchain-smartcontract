//require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY_LOTTERY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../contract-abi.json");
const contractAddress = "0xD938e15C48c0408eC658726ef3D30d0Af11789CB";

export const lotteryContract = new web3.eth.Contract(contractABI, contractAddress);
export const lotteryManeger = async () => {
	const message = await lotteryContract.methods.manager().call();
	return message;
};


export const getMyaddress = async () => {
	const message = await lotteryContract.methods.getMyaddress().call();
	return message;
};
export const getMyBalance = async () => {
	const message = await lotteryContract.methods.getMyBalance().call();
	return message;
};
export const getPeriodAll = async () => {
	const message = await lotteryContract.methods.getPeriodAll().call();
	console.log(message )
	return message;
};








