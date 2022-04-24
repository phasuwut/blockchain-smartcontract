import { Accordion, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import Flex from "components/Gobal/Flex/Flex";
import Lottery from "components/Gobal/Lottery/Lottery";
import { getPeriodAll } from "util/lottery";
import styled from "styled-components";

const Lotteries = () => {
	const [periodAll, setPeriodAll] = useState([]);
	const [showAccordion, setShowAccordion] = useState("0");
	//called only once
	useEffect(() => {
		const fetchData = () => {
			getPeriodAll().then((res) => {
				setPeriodAll(res);
			});
		};
		fetchData();
	}, []);

	return (
		<Wapper>
			<CustomAccordion>
				{periodAll.map((item, i) => {
					return (
						<Accordion.Item eventKey={i.toString()}>
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
									<h4>{`Period => ${item}`}</h4>
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
								<Lottery period={item} />
							</Accordion.Body>
							<hr />
						</Accordion.Item>
					);
				})}
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
export default Lotteries;
