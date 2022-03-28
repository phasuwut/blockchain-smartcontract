import {
	connectWallet,
	getCurrentWalletConnected,
	helloWorldContract,
	loadCurrentMessage,
	updateMessage,
} from "./util/interact.js";
import { useEffect, useState } from "react";

import MasterLayout from "../../../Layout/MasterLayout/MasterLayout";
import React from "react";
import styled from "styled-components";

const HelloWorld = () => {
	//state variables
	const [walletAddress, setWallet] = useState("");
	const [status, setStatus] = useState("");
	const [message, setMessage] = useState("No connection to the network."); //default message
	const [newMessage, setNewMessage] = useState("");

	//called only once
	useEffect(async () => {
		async function fetchMessage() {
			const message = await loadCurrentMessage();
			setMessage(message);
		}
		fetchMessage();
		addSmartContractListener();

		addWalletListener();
	}, []);

	function addSmartContractListener() {
		//TODO: implement
		helloWorldContract.events.UpdatedMessages({}, (error, data) => {
			if (error) {
				setStatus("😥 " + error.message);
			} else {
				setMessage(data.returnValues[1]);
				setNewMessage("");
				setStatus("🎉 Your message has been updated!");
			}
		});

		async function fetchWallet() {
			const { address, status } = await getCurrentWalletConnected();
			console.log(address);
			setWallet(address);
			setStatus(status);
		}
		fetchWallet();
	}

	function addWalletListener() {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", (accounts) => {
				if (accounts.length > 0) {
					setWallet(accounts[0]);
					setStatus("👆🏽 Write a message in the text-field above.");
				} else {
					setWallet("");
					setStatus("🦊 Connect to Metamask using the top right button.");
				}
			});
		} else {
			setStatus(
				<p>
					{" "}
					🦊{" "}
					<a target="_blank" href={`https://metamask.io/download.html`}>
						You must install Metamask, a virtual Ethereum wallet, in your browser.
					</a>
				</p>
			);
		}
	}

	const connectWalletPressed = async () => {
		const walletResponse = await connectWallet();
		setStatus(walletResponse.status);
		setWallet(walletResponse.address);
	};

	const onUpdatePressed = async () => {
		const { status } = await updateMessage(walletAddress, newMessage);
		setStatus(status);
	};

	//the UI of our component
	return (
		<MasterLayout>
			<Wepper>
				<div className="App">
					<div id="container">
						<button id="walletButton" onClick={connectWalletPressed}>
							{walletAddress.length > 0 ? (
								"Connected: " +
								String(walletAddress).substring(0, 6) +
								"..." +
								String(walletAddress).substring(38)
							) : (
								<span>Connect Wallet</span>
							)}
						</button>

						<h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
						<p>{message}</p>

						<h2 style={{ paddingTop: "18px" }}>New Message:</h2>

						<div>
							<input
								type="text"
								placeholder="Update the message in your smart contract."
								onChange={(e) => setNewMessage(e.target.value)}
								value={newMessage}
							/>
							<p id="status">{status}</p>

							<button id="publish" onClick={onUpdatePressed}>
								Update
							</button>
						</div>
					</div>
				</div>
			</Wepper>
		</MasterLayout>
	);
};

const Wepper = styled.div`
	.App {
		text-align: center;
	}

	.App-logo {
		height: 40vmin;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.App-logo {
			animation: App-logo-spin infinite 20s linear;
		}
	}

	.App-header {
		background-color: #282c34;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: calc(10px + 2vmin);
		color: white;
	}

	.App-link {
		color: #61dafb;
	}

	@keyframes App-logo-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
export default HelloWorld;
