import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { awarding, getAward, getBalance, getPeriodAll, lotteryManeger } from "util/lottery";

import Loading from "components/Gobal/Loading/Loading";
import { getCurrentWalletConnected } from "lib/interact";
import styled from "styled-components";

const Award = ({ isShowButtonAwarding = false }) => {
	const [periodAll, setPeriodAll] = useState([]);
	const [listAward, setListAward] = useState([]);
	const [showListAward, setShowListAward] = useState([]);
	const [isManeger, setIsManeger] = useState(false);

	const [manager, setManeger] = useState("");
	const [myAddress, setMyAddress] = useState("");
	const [status, setStatus] = useState("");
	const [addressTransactions, setAddressTransactions] = useState("");

	const [isLoading, setLsLoading] = useState(true);

	useMemo(() => {
		const fetch = async () => {
			const PeriodAll = await getPeriodAll();
			setPeriodAll(PeriodAll);

			const LotteryManeger = await lotteryManeger();
			setManeger(LotteryManeger);

			const CurrentWalletConnected = await getCurrentWalletConnected();
			setMyAddress(CurrentWalletConnected.address);

			await setIsManeger(
				CurrentWalletConnected.address.toUpperCase() === LotteryManeger.toUpperCase()
			);
		};
		fetch();
	}, []);

	useEffect(() => {
		const fetch = async () => {
			const arr = [];
			for (let i = 0; i < periodAll.length; i++) {
				const award = await getAward(periodAll[i]);
				const balance = await getBalance(periodAll[i]);
				arr.push({
					period: periodAll[i],
					Balance: award.Balance,
					BalancePerAddress: award.BalancePerAddress,
					isAwarding: award.isAwarding,
					listAddress: award.listAddress,
					//lotteryStruct: award.lotteryStruct, // เลขที่ออก
					lotteryStruct: award.lotteryStruct.replace(periodAll[i], ""),
					balance: balance,
				});
			}
			setListAward(arr);
			setShowListAward(arr);
			setLsLoading(false);
		};
		if (periodAll.length > 0) {
			fetch();
		}
	}, [periodAll]);
	const handleAwarding = (item) => {
		awarding(myAddress, item.period).then((res) => {
			setStatus(res);
			setAddressTransactions(res.addressTransactions);
		});
	};

	// Modal
	const [show, setShow] = useState(false);
	const [selectShowAddress, setSelectShowAddress] = useState("");
	const handleClose = () => setShow(false);
	const handleShow = (i) => {
		setShow(true);
		setSelectShowAddress(i);
	};

	const [search, setSearch] = useState("");
	const handleChange = (e) => {
		setSearch(e.target.value);
		setShowListAward(listAward.filter((item) => item.period.includes(e.target.value)));
	};

	return (
		<Wepper>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Row>
						<Col xs="2">
							<label>Search Period</label>
						</Col>
						<Col xs="10">
							<input
								type="text"
								value={search}
								placeholder="Search Period"
								onChange={handleChange}
								className="w-full"
							/>
						</Col>
					</Row>
					<br />
					<CustomTable bordered hover responsive striped>
						<thead>
							<tr>
								<th>#</th>
								<th>Period</th>
								<th>งวดนี้มีเงินกลองกลางอยู่เท่าไหร่ (Wei)</th>
								<th>จำนวนเงินที่ได้ต่องวด (Wei)</th>
								<th>แต่ละ Address จะได้จะนวนเงินเท่าไหร่ (Wei)</th>
								<th>ออกรางวัลไปยัง</th>
								<th>เลขที่ออก</th>
								<th>Address ที่ถูกรางวัล</th>
								{isShowButtonAwarding ? <>{isManeger ? <th> ออกสลาก</th> : null}</> : null}
							</tr>
						</thead>
						<tbody>
							{showListAward.map((item, i) => {
								return (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>{item.period}</td>
										<td>{parseInt(item.balance).toLocaleString()}</td>
										<td>{parseInt(item.Balance).toLocaleString()}</td>
										<td>{parseInt(item.BalancePerAddress).toLocaleString()}</td>
										<td>{`${item.isAwarding ? "ออกรางวัลไปแล้ว" : "ยังไม่ได้ออกรางวัล"}`}</td>
										<td>{item.lotteryStruct !== "" ? item.lotteryStruct : "-"}</td>
										<td>
											<Button
												variant="primary"
												onClick={() => handleShow(i)}
												disabled={!item.isAwarding}
											>
												กดเพื่อดูว่าใครถูกบ้าง
											</Button>
										</td>
										{isShowButtonAwarding ? (
											<>
												{isManeger ? (
													<td>
														<Button
															variant="primary"
															disabled={item.isAwarding}
															onClick={() => handleAwarding(item)}
														>
															ออกสลาก
														</Button>
													</td>
												) : null}
											</>
										) : null}
									</tr>
								);
							})}
						</tbody>
					</CustomTable>

					{addressTransactions !== "" ? (
						<div>
							<h6>Transaction การออกรางวัล</h6>
							<p id="status">{status.status}</p>
						</div>
					) : null}

					{selectShowAddress !== "" || listAward.length1 == 0 ? (
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Address ที่ถูกรางวัล</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<ui>
									{listAward[selectShowAddress].listAddress.map((item2, j) => {
										return <li key={j}>{item2}</li>;
									})}
								</ui>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									Close
								</Button>
							</Modal.Footer>
						</Modal>
					) : null}
					<hr />
				</>
			)}
		</Wepper>
	);
};

const Wepper = styled.div``;
const CustomTable = styled(Table)`
	background-color: snow;
`;
export default Award;
