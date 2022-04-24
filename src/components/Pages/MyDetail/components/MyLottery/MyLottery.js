import { Accordion, Button, Table } from "react-bootstrap";
import React, { useState } from "react";

import Flex from "components/Gobal/Flex/Flex";
import styled from "styled-components";

const MyLottery = ({ myListLottery }) => {
	const [showAccordion, setShowAccordion] = useState("0");

	return (
		<Wapper>
			<CustomAccordion>
				{myListLottery.map((item, i) => {
					return (
						<Accordion.Item eventKey={i.toString()} key={i}>
							<CustomAccordionHeader>
								<Flex
									onClick={() => {
										if (showAccordion === i.toString()) {
											setShowAccordion("");
										} else {
											setShowAccordion(i.toString());
										}
									}}
								>
									<h4>{`Period => ${item.period}`}</h4>

									{showAccordion === i.toString() ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="40"
											height="40"
											fill="currentColor"
											class="bi bi-arrow-down-square-fill"
											viewBox="0 0 16 16"
										>
											<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="40"
											height="40"
											fill="currentColor"
											class="bi bi-arrow-up-square-fill"
											viewBox="0 0 16 16"
										>
											<path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
										</svg>
									)}
								</Flex>
							</CustomAccordionHeader>
							<Accordion.Body>
								<Table bordered hover responsive striped>
									<thead>
										<tr>
											<th>#</th>
											<th>Number</th>
											<th>Address</th>
										</tr>
									</thead>
									<tbody>
										{item.listNeuber.map((item2, j) => {
											return (
												<tr key={j}>
													<td>{j + 1}</td>
													<td>{item2.number}</td>

													<td>{item2.address}</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</Accordion.Body>
						</Accordion.Item>
					);
				})}

				<hr />
			</CustomAccordion>
		</Wapper>
	);
};
const CustomAccordionHeader = styled(Accordion.Header)`
	button {
		width: 100%;
	}
`;
const CustomAccordion = styled(Accordion)`
	width: 90%;
	background-color: #e6f7ff;
`;
const Wapper = styled.div`
	display: flex;
	justify-content: center;
`;
export default MyLottery;
