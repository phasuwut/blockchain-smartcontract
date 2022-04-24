import React, { useEffect, useState } from "react";
import { getBuyerResult, getMyBalance, getMyaddress, getPeriodAll, isRegistor } from "util/lottery";

import { Accordion } from "react-bootstrap";
import Center from "components/Gobal/Center/Center";
import Flex from "components/Gobal/Flex/Flex";
import MasterLayout from "components/Layout/MasterLayout/MasterLayout";
import Register from "components/Gobal/Register/Register";
import { getCurrentWalletConnected } from "lib/interact";
import styled from "styled-components";

const Check = () => {
	const [myAddress, setMyaddress] = useState("");
	const [myBalance, setMyBalance] = useState("");
	const [periodAll, setPeriodAll] = useState([]);
	const [listBuyer, setListBuyer] = useState([]);
	const [isShowRegistor, setIsShowRegistor] = useState(true);

	const [browserIsCannotMetamask, setBrowserIsCannotMetamask] = useState(false);
	const [showAccordion, setShowAccordion] = useState("0");

	//called only once
	useEffect(() => {
		const fetchData = () => {
			const { ethereum } = window;
			getCurrentWalletConnected().then((res) => {
				const { address } = res;
				setMyaddress(address);
			});
			getBuyerResult().then((res) => {
				console.log(res);
				setListBuyer(res);
			});
			getPeriodAll().then((res) => {
				console.log(res);
				setPeriodAll(res);
			});

			// getMyAddress
			ethereum.request({ method: "eth_accounts" }).then((res) => {
				const MyAddress = res[0];
				isRegistor(MyAddress).then((res) => {
					console.log(res);
					setIsShowRegistor(!res);
				});
				getMyBalance(MyAddress).then((res) => {
					console.log(res);
					setMyBalance(res);
				});
			});
		};

		if (window.ethereum) {
			setBrowserIsCannotMetamask(true);
			fetchData();
		} else {
			setBrowserIsCannotMetamask(false);
		}
	}, []);

	return (
		<MasterLayout>
			{browserIsCannotMetamask ? (
				<div>
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
									<h1>ขัอมูลส่วนตัว</h1>
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
								<p>{`getMyaddress => ${myAddress}`}</p>
								<p>{`getMyBalance => ${myBalance}`}</p>
								<p>{`getPeriodAll => ${periodAll}`}</p>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>

					<hr />

					{isShowRegistor ? <Register myAddress={myAddress} /> : null}
				</div>
			) : (
				<Center>
					<h1> Please change browser</h1>
				</Center>
			)}
		</MasterLayout>
	);
};
const CustomAccordionHeader = styled(Accordion.Header)`
	button {
		width: 100%;
	}
`;
export default Check;
