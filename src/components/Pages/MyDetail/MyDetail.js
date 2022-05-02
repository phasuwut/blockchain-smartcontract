import { Accordion, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getMyDetailBuyer, getMyLotteryByPeriod } from "util/lottery";

import Center from "components/Gobal/Center/Center";
import Flex from "components/Gobal/Flex/Flex";
import MasterLayout from "components/Layout/MasterLayout/MasterLayout";
import MyLottery from "components/Pages/MyDetail/components/MyLottery/MyLottery";
import styled from "styled-components";

const MyDetail = () => {
	const [browserIsCannotMetamask, setBrowserIsCannotMetamask] = useState(false);
	const [isCannotMetamask, setIsCannotMetamask] = useState(false);
	const [myAddress, setMyaddress] = useState("");
	const [myDetail, setMyDetail] = useState({});
	const [myListLottery, setMyListLottery] = useState([]);
	//called only once
	useEffect(() => {
		const fetchData = () => {
			const { ethereum } = window;

			// getMyAddress
			ethereum.request({ method: "eth_accounts" }).then((res) => {
				const MyAddress = res[0];

				if (MyAddress) {
					setIsCannotMetamask(true);
					setMyaddress(MyAddress);
					getMyDetailBuyer(MyAddress).then((res) => {
						//console.log(res);
						setMyDetail(res);
					});
				} else {
					setIsCannotMetamask(false);
				}
			});
		};
		if (window.ethereum) {
			setBrowserIsCannotMetamask(true);
			fetchData();
		} else {
			setBrowserIsCannotMetamask(false);
		}
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			if (isCannotMetamask) {
				const arr = [];
				const Period = myDetail[3] || [];
				for (let i = 0; i < Period.length; i++) {
					const myNumberLottery = await getMyLotteryByPeriod(myAddress, Period[i]);

					const arr2 = [];
					(myNumberLottery || []).map((item) => {
						arr2.push({ number: item, address: `${Period[i]}${item}` });
					});
					arr.push({ period: Period[i], listNeuber: arr2 });
				}
				//console.log(arr);
				setMyListLottery(arr);
			}
		};
		fetchData();
	}, [myDetail]);

	const [showAccordion, setShowAccordion] = useState("0");

	return (
		<MasterLayout>
			<Wapper>
				{browserIsCannotMetamask ? (
					<>
						{isCannotMetamask ? (
							<div>
								<hr />
								<div className="flex justify-center">
									<div className="w-11/12">
										<div className="w-full">
											<h1 style={{ textAlign: "center" }}> ข้อมูลของฉัน</h1>

											<Accordion defaultActiveKey="0">
												<Accordion.Item eventKey="0">
													<CustomAccordionHeader>
														<Flex
															onClick={() => {
																console.log("0");
																if (showAccordion === "0") {
																	setShowAccordion("");
																} else {
																	setShowAccordion("0");
																}
															}}
														>
															<h4>ข้อมูลต่างๆของฉัน</h4>
															{showAccordion === "0" ? (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="50"
																	height="50"
																	fill="currentColor"
																	class="bi bi-arrow-down"
																	viewBox="0 0 16 16"
																>
																	<path
																		fill-rule="evenodd"
																		d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
																	/>
																</svg>
															) : (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="50"
																	height="50"
																	fill="currentColor"
																	class="bi bi-arrow-up"
																	viewBox="0 0 16 16"
																>
																	<path
																		fill-rule="evenodd"
																		d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
																	/>
																</svg>
															)}
														</Flex>
													</CustomAccordionHeader>
													<Accordion.Body>
														<CustomTable bordered hover responsive striped>
															<tbody>
																<tr>
																	<td>myAddress</td>
																	<td>{myAddress}</td>
																</tr>

																<tr>
																	<td>First name</td>
																	<td>{myDetail[0]}</td>
																</tr>
																<tr>
																	<td>Last name </td>
																	<td>{myDetail[1]}</td>
																</tr>
																<tr>
																	<td>Email</td>
																	<td>{myDetail[2]}</td>
																</tr>
															</tbody>
														</CustomTable>
													</Accordion.Body>
												</Accordion.Item>
												<hr />

												<Accordion.Item eventKey="1">
													<CustomAccordionHeader>
														<Flex
															onClick={() => {
																console.log("1");
																if (showAccordion === "1") {
																	setShowAccordion("");
																} else {
																	setShowAccordion("1");
																}
															}}
														>
															<h4>ข้อมูลการซื้อหวยของฉัน</h4>
															{showAccordion === "1" ? (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="50"
																	height="50"
																	fill="currentColor"
																	class="bi bi-arrow-down"
																	viewBox="0 0 16 16"
																>
																	<path
																		fill-rule="evenodd"
																		d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
																	/>
																</svg>
															) : (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="50"
																	height="50"
																	fill="currentColor"
																	class="bi bi-arrow-up"
																	viewBox="0 0 16 16"
																>
																	<path
																		fill-rule="evenodd"
																		d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
																	/>
																</svg>
															)}
														</Flex>
													</CustomAccordionHeader>
													<Accordion.Body>
														<MyLottery myListLottery={myListLottery} />
													</Accordion.Body>
												</Accordion.Item>
											</Accordion>
										</div>
									</div>
								</div>
							</div>
						) : (
							<Center>
								<h1> Please Connect metamask</h1>
							</Center>
						)}
					</>
				) : (
					<Center>
						<h1> Please change browser</h1>
					</Center>
				)}
			</Wapper>
		</MasterLayout>
	);
};
const Wapper = styled.div``;

const CustomAccordionHeader = styled(Accordion.Header)`
	button {
		width: 100%;
	}
`;
const CustomTable = styled(Table)`
	background-color: snow;
`;
export default MyDetail;
