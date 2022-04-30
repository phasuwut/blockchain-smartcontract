import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Center from "components/Gobal/Center/Center";
import { Form } from "react-bootstrap";
import { isRegistor as IsRegistor } from "util/lottery";
import { Link } from "react-router-dom";
import { buyersRegister } from "util/lottery";

const RegisterPage = () => {
	const [browserIsCannotMetamask, setBrowserIsCannotMetamask] = useState(false);
	const [isRegistor, setIsRegistor] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [myAddress, setMyAddress] = useState("");

	const [status, setStatus] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			// get account, Address
			const { ethereum } = window;
			const getAddress = await ethereum.request({ method: "eth_accounts" });
			if (getAddress.length >= 0) {
				const MyAddress = getAddress[0];
				const IsRegistor2 = await IsRegistor(MyAddress);
				setIsRegistor(IsRegistor2);
				setMyAddress(MyAddress);
			}
		};
		if (window.ethereum) {
			setBrowserIsCannotMetamask(true);
			fetchData();
		} else {
			setBrowserIsCannotMetamask(false);
		}
	}, []);

	const handleonSubmitRegister = (event) => {
		event.preventDefault();
		if (firstName === "") {
			alert("firstName ป้อนข้อมูลด้วย");
			return 0;
		}
		if (lastName === "") {
			alert("lastName ป้อนข้อมูลด้วย");
			return 0;
		}
		if (email === "") {
			alert("email ป้อนข้อมูลด้วย");
			return 0;
		}

		buyersRegister(myAddress, firstName, lastName, email).then((res) => {
			setStatus(res.status);
		});
	};
	return (
		<>
			{browserIsCannotMetamask ? (
				<>
					{!isRegistor ? (
						<>
							<div className="login-From">
								<Row className="justify-content-md-center">
									<h3>Sign up</h3>
								</Row>
								<Form onSubmit={handleonSubmitRegister}>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Row>
											<Col md={{ span: 2, offset: 2 }}>
												<label>Firstname</label>
											</Col>
											<Col md={{ span: 6 }}>
												<Form.Control
													placeholder="FirstName"
													type="text"
													value={firstName}
													onChange={(event) => {
														setFirstName(event.target.value);
													}}
												/>
											</Col>
										</Row>
									</Form.Group>


									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Row>
											<Col md={{ span: 2, offset: 2 }}>
												<label>Lastname</label>
											</Col>
											<Col md={{ span: 6 }}>
												<Form.Control
													placeholder="LastName"
													type="text"
													value={lastName}
													onChange={(event) => {
														setLastName(event.target.value);
													}}
												/>
											</Col>
										</Row>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Row>
											<Col md={{ span: 2, offset: 2 }}>
												<label>Email</label>
											</Col>
											<Col md={{ span: 6 }}>
												<Form.Control
													placeholder="Email"
													type="email"
													value={email}
													onChange={(event) => {
														setEmail(event.target.value);
													}}
												/>
											</Col>
										</Row>
									</Form.Group>

									<Row className="justify-content-md-center">
										<Col md={{ span: 4 }}>
											<button type="submit" className="btn btn-warning btn-lg btn-block">
												Sign up
											</button>
										</Col>
									</Row>
									<br />

									<Row className="justify-content-md-center">
										<Col md={{ span: 4 }}>
											<Link to="/home">
												<button type="button" className="btn btn-dark btn-lg btn-block">
													back
												</button>
											</Link>
										</Col>
									</Row>
								</Form>
								<p id="status">{status}</p>
							</div>
						</>
					) : (
						<Center>
							<Link to="/home">
								<h1>คุณ ได้ Registor ไปแล้ว </h1>
							</Link>
						</Center>
					)}
				</>
			) : (
				<Center>
					<h1> Please change browser</h1>
				</Center>
			)}
		</>
	);
};


export default RegisterPage;

