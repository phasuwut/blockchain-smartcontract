import { Button, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { connectWallet, getCurrentWalletConnected, getUserBalance } from "../../../../lib/interact";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store/rootReducer";
import { setWallet as setWalletStore } from "store/wallet/wallet";

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
			<Navbar.Brand href="/">Lottery</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="home">Home</Nav.Link>
					<Nav.Link href="search">การซื้อขาย Lottery</Nav.Link>
					<Nav.Link href="history">ประวัติการซื้อของฉัน</Nav.Link>
					<Nav.Link href="award">การออกรางวัล</Nav.Link>
					<NavDropdown title="Tools" id="basic-nav-dropdown">
						<NavDropdown.Item href="detail-all">ข้อมูล All</NavDropdown.Item>
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
