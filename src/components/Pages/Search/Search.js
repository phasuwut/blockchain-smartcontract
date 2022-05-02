import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import {
	buyingLottery,
	getAward,
	isRegistor as getIsRegistor,
	getLotteryDetailByAddress,
	getPeriodAll,
	getPeriodDetail,
} from "../../../util/lottery";
import { useEffect, useMemo, useState } from "react";

import Center from "components/Gobal/Center/Center";
import Loading from "components/Gobal/Loading/Loading";
import MasterLayout from "../../../components/Layout/MasterLayout/MasterLayout";
import React from "react";
import styled from "styled-components";

const SearchPage = () => {
	const [myAddress, setMyaddress] = useState("");
	const [isRegistor, setIsRegistor] = useState(false);
	const [status, setStatus] = useState("");
	const [isAwarding, setIsAwarding] = useState(true);
	const [browserIsCannotMetamask, setBrowserIsCannotMetamask] = useState(false);
	const [isCannotMetamask, setIsCannotMetamask] = useState(false);
	const [isLoading, setLsLoading] = useState(true);

	useMemo(() => {
		const fetchData = () => {
			const { ethereum } = window;
			ethereum.request({ method: "eth_accounts" }).then((res) => {
				const MyAddress = res[0];
				setMyaddress(MyAddress);
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
		if (myAddress === undefined) {
			setIsCannotMetamask(false);
		} else {
			setIsCannotMetamask(true);
			if (myAddress !== "") {
				getIsRegistor(myAddress).then((res) => {
					setIsRegistor(res);
				});
			}
		}
	}, [myAddress]);

	const [search, setSearch] = useState("");
	const handleChange = (e) => {
		if (e.target.value === "") {
			setSearch("");
		} else {
			setSearch(e.target.value);
		}
	};

	const [listLottery, setListLottery] = useState([]);
	const [isClickBuy, setIsClickBuy] = useState(false);
	const [period, setPeriod] = useState("");
	useEffect(() => {
		const fetch = () => {
			getPeriodAll().then((res) => {
				setPeriod(res[res.length - 1]); // เอาตัวล่าสุด
			});
		};
		if (isRegistor) {
			fetch();
		}
	}, [isRegistor]);
	useEffect(() => {
		const fetch = async () => {
			const arr = [];
			const periodDetail = await getPeriodDetail(period);
			for (let i = 0; i < periodDetail.length; i++) {
				const address = `${periodDetail[i]}${period}`;
				const lotteryDetailByAddress = await getLotteryDetailByAddress(periodDetail[i], period);

				arr.push({
					address: address,
					number: periodDetail[i],
					listAddress: lotteryDetailByAddress.listAddress,
					amount: lotteryDetailByAddress.amount,
				});
			}
			setListLottery(arr);
			const award = await getAward(period);
			setIsAwarding(award.isAwarding);
			setLsLoading(false);
		};
		if (period !== "") {
			fetch();
		}
	}, [period]);
	const handleOnBuy = () => {
		buyingLottery(myAddress, selectItem, period).then((res) => {
			//console.log(res);
			setStatus(res);
			setIsClickBuy(true);
		});
	};

	// Modal
	const [show, setShow] = useState(false);
	const [selectItem, setSelectItem] = useState("");
	const handleClose = () => setShow(false);
	const handleShow = (item) => {
		setShow(true);
		setIsClickBuy(false);
		setSelectItem(item.number);
	};

	return (
		<MasterLayout>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Wepper>
						{!browserIsCannotMetamask ? (
							<Center>
								<h1> Please change browser</h1>
							</Center>
						) : (
							<>
								{!isCannotMetamask ? (
									<Center>
										<h1> Please Connect metamask</h1>
									</Center>
								) : (
									<>
										{!isRegistor ? (
											<Center>
												<h1> Please register</h1>
											</Center>
										) : (
											<div>
												<br />
												<div className="form-group">
													<Row className="justify-content-md-center">
														<Col md={{ span: 8 }}>
															<input
																type="text"
																className="form-control"
																placeholder="Search"
																onChange={handleChange}
															/>
														</Col>
													</Row>
												</div>
												<br />
												<div class="container">
													<Row className="justify-content-md-center">
														{listLottery
															.filter((lotery) => lotery.number.includes(search))
															.map((item, i) => {
																return (
																	<Card
																		style={{
																			width: "30rem",
																			marginLeft: "3%",
																			border: "3px solid #ffc107",
																			backgroundColor: "cornsilk",
																		}}
																	>
																		<Card.Body>
																			<Card.Title>
																				งวดวันที่ : {period.substring(0, 2)}{" "}
																				{period.substring(2, 4)}{" "}
																				{parseInt(period.substring(4)) + 543}
																			</Card.Title>
																			<Card.Subtitle className="mb-2 text-muted">
																				คงเหลือ : {item.amount} ใบ
																			</Card.Subtitle>
																			<Card.Text>
																				<h3 style={{ textAlign: "center" }}>{item.number}</h3>
																			</Card.Text>
																			<Row>
																				<Col md={{ span: 2 }}>
																					<Button
																						variant="primary"
																						disabled={
																							item.amount === "0" ||
																							!isRegistor ||
																							!browserIsCannotMetamask ||
																							isAwarding
																						}
																						onClick={() => handleShow(item)}
																					>
																						ซื้อ
																					</Button>
																				</Col>
																			</Row>
																		</Card.Body>
																	</Card>
																);
															})}
													</Row>
												</div>
											</div>
										)}
									</>
								)}
							</>
						)}

						<br />
					</Wepper>

					<Modal show={show} onHide={handleClose}>
						<Modal.Body>
							<h6>{`คุณต้องการซื้อ เลข ${selectItem}  งวดวันที่ ${period} หรือไม่ ?`}</h6>
							<br />

							<p id="status">{status.status}</p>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="primary" onClick={handleOnBuy} disabled={isClickBuy}>
								ซื้อ
							</Button>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
		</MasterLayout>
	);
};
const Wepper = styled.div``;
export default SearchPage;
