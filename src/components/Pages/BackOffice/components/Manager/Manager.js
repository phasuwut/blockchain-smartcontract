import { Button, Form } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { generateLottery, getAward, getPeriodAll } from "util/lottery";

import Award from "components/Gobal/Award/Award"

const Manager = ({ myAddress }) => {
	const [period, setPeriod] = useState("");
	const [periodAll, setPeriodAll] = useState([]);



	const handleonSubmitGenerateLottery = (event) => {
		event.preventDefault();
		generateLottery(myAddress, period).then((res) => {
			console.log(res);
		});
	};

	return (
		<div>
			<h1>BackOffice manager</h1>
			<hr />
			<Award  />
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
