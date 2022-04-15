import { Button, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { connectWallet, getCurrentWalletConnected, getUserBalance } from "../../../../lib/interact";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../../store/rootReducer";
import { setWallet as setWalletStore } from "../../../../store/wallet/wallet";

const MasterLayoutNavbar = () => {
	//dedux
	const dispatch = useDispatch();
	const walletStore = useSelector((state: RootState) => state.wallet);

	const [walletAddress, setWallet] = useState("");
	const [status, setStatus] = useState("");
	const connectWalletPressed = async () => {
		const walletResponse = await connectWallet();
		setStatus(walletResponse.status);
		setWallet(walletResponse.address);
	};
	const addSmartContractListener = () => {
		const fetchWallet = async () => {
			const { address, status } = await getCurrentWalletConnected();
			setWallet(address);
			setStatus(status);
			dispatch(setWalletStore({ ...walletStore.wallet, walletAddress: address }));
		};
		fetchWallet();
	};
	useMemo(() => {
		addSmartContractListener();
	}, []);
	useEffect(async () => {
		if (walletAddress !== "") {
			const money = await getUserBalance(walletAddress);
			dispatch(setWalletStore({ ...walletStore.wallet, money: money }));
		}
	}, [walletAddress]);

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="/">Block Chain</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="search">search</Nav.Link>
					<Nav.Link href="history">history</Nav.Link>
					<NavDropdown title="Smart Contract" id="basic-nav-dropdown">
						<NavDropdown.Item href="smart-contract/test1">SmartContractTest1</NavDropdown.Item>
						<NavDropdown.Item href="contact-us">Contact-us</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>
					<NavDropdown title="Lottery" id="basic-nav-dropdown">
						<NavDropdown.Item href="contact-us">Contact-us</NavDropdown.Item>
					</NavDropdown>
					<NavDropdown title="Tools" id="basic-nav-dropdown">
						<NavDropdown.Item href="check">Check All</NavDropdown.Item>
						<NavDropdown.Item href="back-office">BackOffice</NavDropdown.Item>
						<NavDropdown.Item href="my-detail">MyDetail</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<Button variant="outline-success" onClick={connectWalletPressed}>
						{walletAddress.length > 0 ? (
							"Connected: " +
							String(walletAddress).substring(0, 6) +
							"..." +
							String(walletAddress).substring(38)
						) : (
							<span>Connect Wallet</span>
						)}
					</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default MasterLayoutNavbar;
