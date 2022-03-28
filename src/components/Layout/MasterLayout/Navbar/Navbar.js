import { Button, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "../../../../lib/interact";

const MasterLayoutNavbar = () => {
	const [walletAddress, setWallet] = useState("");
	const [status, setStatus] = useState("");

	const connectWalletPressed = async () => {
		const walletResponse = await connectWallet();
		//console.log(walletResponse);
		setStatus(walletResponse.status);
		setWallet(walletResponse.address);
	};
	const addSmartContractListener = () => {
		const fetchWallet = async () => {
			const { address, status } = await getCurrentWalletConnected();
			console.log(address);
			setWallet(address);
			setStatus(status);
		};
		fetchWallet();
	};
	useMemo(()=>{
		addSmartContractListener(); 
	},[])

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
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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
