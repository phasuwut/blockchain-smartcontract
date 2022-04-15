import React, { useState } from "react";
import { buyersRegister } from "../../../util/lottery";

import { Button, Form } from "react-bootstrap";

const Register = ({ myAddress }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const [status, setStatus] = useState("");


	const handleonSubmitGenerateLottery = (event) => {
        event.preventDefault();
        buyersRegister(myAddress, firstName, lastName, email).then((res) => {
			console.log(res);
			setStatus(res.status);
		});
    }
    
	return (
		<div>
			<h1>Register</h1>

			<Form onSubmit={handleonSubmitGenerateLottery}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>FirstName</Form.Label>
					<Form.Control
						placeholder="FirstName"
						type="text"
						value={firstName}
						onChange={(event) => {
							setFirstName(event.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>LastName</Form.Label>
					<Form.Control
						placeholder="LastName"
						type="text"
						value={lastName}
						onChange={(event) => {
							setLastName(event.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						placeholder="Email"
						type="email"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
				</Form.Group>
			
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			<p id="status">{status}</p>
		</div>
	);
};

export default Register;
