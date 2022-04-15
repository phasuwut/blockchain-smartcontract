import React, { useState, useMemo } from "react";

import { generateLottery, getPeriodAll } from "../../../../../util/lottery";
import { Button, Form } from "react-bootstrap";

const Manager = ({ myAddress }) => {
	const [period, setPeriod] = useState("");
	const [periodAll, setPeriodAll] = useState([]);

	const handleonSubmitGenerateLottery = (event) => {
		event.preventDefault();
		console.log(period);
		generateLottery(myAddress, period).then((res) => {
			console.log(res);
		});
	};
	useMemo(() => {
		getPeriodAll().then((res) => {
			console.log(res);
			setPeriodAll(res);
		});
	}, []);
	return (
		<div>
			<h1>BackOffice manager</h1>
			<hr />
			<h4>PeriodAll</h4>
			<ul>
				{periodAll.map((item, i) => {
					return <li key={i}>{item}</li>;
				})}
			</ul>
			<hr />
			<Form onSubmit={handleonSubmitGenerateLottery}>
				<Form.Group className="mb-3">
					<Form.Label>Period</Form.Label>
					<Form.Control
						placeholder="period"
						type={"text"}
						value={period}
						onChange={(event) => {
							setPeriod(event.target.value);
						}}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			<hr />
		</div>
	);
};

export default Manager;
