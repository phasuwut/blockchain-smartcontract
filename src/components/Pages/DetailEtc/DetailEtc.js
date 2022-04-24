import { Accordion, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getBuyerResult, getPeriodAll } from "util/lottery";

import Award from "components/Gobal/Award/Award";
import Flex from "components/Gobal/Flex/Flex";
import Lotteries from "components/Pages/DetailEtc/components/Lotteries/Lotteries";
import MasterLayout from "components/Layout/MasterLayout/MasterLayout";
import styled from "styled-components";

const DetailEtc = () => {
	const [showAccordion, setShowAccordion] = useState("0");
	const [listBuyer, setListBuyer] = useState([]);
	const [periodAll, setPeriodAll] = useState([]);

	//called only once
	useEffect(() => {
		const fetchData = () => {
			getBuyerResult().then((res) => {
				console.log(res);
				setListBuyer(res);
			});
			getPeriodAll().then((res) => {
				console.log(res);
				setPeriodAll(res);
			});
		};

		fetchData();
	}, []);

	return (
		<MasterLayout>
			<div>DetailEtc</div>
			<CustomAccordion defaultActiveKey="0">
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
							<h4>ข้อมูลผู้ใช้ทั้งหมด</h4>
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
						<Table bordered hover responsive striped>
							<thead>
								<tr>
									<th>#</th>
									<th>Address</th>
								</tr>
							</thead>
							<tbody>
								{(listBuyer || []).map((item, i) => {
									return (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{item}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
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
							<h4>การออกรางวัล</h4>
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
						<Award />
					</Accordion.Body>
				</Accordion.Item>
				<hr />

				<Accordion.Item eventKey="2">
					<CustomAccordionHeader>
						<Flex
							onClick={() => {
								console.log("2");
								if (showAccordion === "2") {
									setShowAccordion("");
								} else {
									setShowAccordion("2");
								}
							}}
						>
							<h4>Period All</h4>
							{showAccordion === "2" ? (
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
						<Table bordered hover responsive striped>
							<thead>
								<tr>
									<th>#</th>
									<th>Period</th>
								</tr>
							</thead>
							<tbody>
								{(periodAll || []).map((item, i) => {
									return (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{item}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Accordion.Body>
				</Accordion.Item>
				<hr />

				<Accordion.Item eventKey="3">
					<CustomAccordionHeader>
						<Flex
							onClick={() => {
								console.log("3");
								if (showAccordion === "3") {
									setShowAccordion("");
								} else {
									setShowAccordion("3");
								}
							}}
						>
							<h4>หวยทั้งหมด</h4>
							{showAccordion === "3" ? (
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
						<Lotteries />
					</Accordion.Body>
				</Accordion.Item>

				<hr />
			</CustomAccordion>
		</MasterLayout>
	);
};
const CustomAccordion = styled(Accordion)`
	//background-color: #ffffe6;
`;
const CustomAccordionHeader = styled(Accordion.Header)`
	button {
		width: 100%;
	}
`;
export default DetailEtc;
