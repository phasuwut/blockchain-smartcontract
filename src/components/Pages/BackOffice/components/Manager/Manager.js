import { Accordion, Button, Form } from "react-bootstrap";
import React, { useState } from "react";

import Award from "components/Gobal/Award/Award";
import Flex from "components/Gobal/Flex/Flex";
import { generateLottery } from "util/lottery";
import styled from "styled-components";

const Manager = ({ myAddress }) => {
	const [period, setPeriod] = useState("");
	const [status, setStatus] = useState("");

	const handleonSubmitGenerateLottery = (event) => {
		event.preventDefault();
		generateLottery(myAddress, period).then((res) => {
			console.log(res);
			setStatus(res);
		});
	};

	return (
		<div>
			<h1>BackOffice manager</h1>
			<hr />

			<div>
				<Accordion defaultActiveKey="0">
					<Accordion.Item eventKey="0">
						<CustomAccordionHeader>
							<Flex>
								<h1>Period ทั้งหมด</h1>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="50"
									height="50"
									fill="currentColor"
									class="bi bi-arrow-bar-down"
									viewBox="0 0 16 16"
								>
									<path
										fill-rule="evenodd"
										d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
									/>
								</svg>
							</Flex>
						</CustomAccordionHeader>
						<Accordion.Body>
							<Award />
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="1">
						<CustomAccordionHeader>
							<Flex>
								<h1>Ganarate Lorrery</h1>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="50"
									height="50"
									fill="currentColor"
									class="bi bi-arrow-bar-down"
									viewBox="0 0 16 16"
								>
									<path
										fill-rule="evenodd"
										d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
									/>
								</svg>
							</Flex>
						</CustomAccordionHeader>
						<Accordion.Body>
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
							{status !== "" ? (
								<div>
									<h6>Transaction การออกรางวัล</h6>
									<p id="status">{status.status}</p>
								</div>
							) : null}
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</div>

			<hr />
		</div>
	);
};
const CustomAccordionHeader = styled(Accordion.Header)`
	button {
		width: 100%;
	}
`;
export default Manager;
