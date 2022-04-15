//require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY_LOTTERY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../contract-abi.json");
const contractAddress = "0xcB2E6A3E8db6D22927C7737123e1adEb53EaA4a9";

export const lotteryContract = new web3.eth.Contract(contractABI, contractAddress);
export const lotteryManeger = async () => {
	const message = await lotteryContract.methods.manager().call();
	return message;
};
export const getMyBalance = async () => {
	const message = await lotteryContract.methods.getMyBalance().call();
	return message;
};
export const getBuyerResult = async () => {
	const message = await lotteryContract.methods.get_buyer_result().call();
	return message;
};
export const getPeriodAll = async () => {
	const message = await lotteryContract.methods.getPeriodAll().call();
	console.log(message);
	return message;
};
export const buyersRegister = async (myAddress, firstName, lastName, email) => {
	//input error handling
	if (!window.ethereum || myAddress === null) {
		return {
			status: "💡 Connect your Metamask wallet to update the message on the blockchain.",
		};
	}

	//set up transaction parameters
	const transactionParameters = {
		to: contractAddress, // Required except during contract publications.
		from: myAddress, // must match user's active address.
		data: lotteryContract.methods.buyersRegister(firstName, lastName, email).encodeABI(),
	};

	//sign the transaction
	try {
		const txHash = await window.ethereum.request({
			method: "eth_sendTransaction",
			params: [transactionParameters],
		});
		return {
			status: (
				<span>
					✅{" "}
					<a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
						View the status of your transaction on Etherscan!
					</a>
					<br />
					ℹ️ Once the transaction is verified by the network, the message will be updated
					automatically.
				</span>
			),
		};
	} catch (error) {
		return {
			status: "😥 " + error.message,
		};
	}
};

export const generateLottery = async (myAddress,Period )=>{
		//input error handling
		if (!window.ethereum || myAddress === null) {
			return {
				status: "💡 Connect your Metamask wallet to update the message on the blockchain.",
			};
		}
	
		//set up transaction parameters
		const transactionParameters = {
			to: contractAddress, // Required except during contract publications.
			from: myAddress, // must match user's active address.
			data: lotteryContract.methods.generateLottery(Period).encodeABI(),
		};
	
		//sign the transaction
		try {
			const txHash = await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [transactionParameters],
			});
			return {
				status: (
					<span>
						✅{" "}
						<a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
							View the status of your transaction on Etherscan!
						</a>
						<br />
						ℹ️ Once the transaction is verified by the network, the message will be updated
						automatically.
					</span>
				),
			};
		} catch (error) {
			return {
				status: "😥 " + error.message,
			};
		}
}

// bug
export const getMyaddress = async (address) => {
	/* 	const transactionParameters = {
		to: contractAddress, // Required except during contract publications.
		from: address, // must match user's active address.
		data: lotteryContract.methods.getMyaddress().encodeABI(),
	};
	console.log(transactionParameters);
	//sign the transaction
	try {
		console.log(11111111);
		const txHash = await window.ethereum.request({
			method: "eth_sendTransaction",
			params: [transactionParameters],
		});
		console.log(3333);
		console.log(txHash);
		return txHash;
	} catch (error) {
		console.log(3333)
		console.log(error);
		return "error";
	} */

	const message = await lotteryContract.methods.getMyaddress().call();
	return message;
};