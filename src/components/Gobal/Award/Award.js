import { Accordion, Button, Modal, Table } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { awarding, getAward, getPeriodAll, lotteryManeger } from "util/lottery";

import { getCurrentWalletConnected } from "lib/interact";
import styled from "styled-components";

const Award = () => {
	const [periodAll, setPeriodAll] = useState([]);
	const [listAward, setListAward] = useState([]);
	const [isManeger, setIsManeger] = useState(false);

	const [manager, setManeger] = useState("");
	const [myAddress, setMyAddress] = useState("");
	const [status, setStatus] = useState("");
	const [addressTransactions, setAddressTransactions] = useState("");

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
			if (periodAll.length > 0) {
				const arr = [];
				for (let i = 0; i < periodAll.length; i++) {
					const award = await getAward(periodAll[i]);

					arr.push({
						period: periodAll[i],
						Balance: award.Balance,
						BalancePerAddress: award.BalancePerAddress,
						isAwarding: award.isAwarding,
						listAddress: award.listAddress,
						lotteryStruct: award.lotteryStruct, // เลขที่ออก
					});
				}
				setListAward(arr);
			}
		};
		fetch();
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


	return (
		<Wepper>
	

			<Table bordered hover responsive striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Period</th>
						<th>จำนวนเงินที่ได้ต่องวด (Wei)</th>
						<th>แต่ละ Address จะได้จะนวนเงินเท่าไหร่ (Wei)</th>
						<th>ออกรางวัลไปยัง</th>
						<th>เลขที่ออก</th>
						<th>Address ที่ถูกรางวัล</th>
						{isManeger ? <th> ออกสลาก</th> : null}
					</tr>
				</thead>
				<tbody>
					{listAward.map((item, i) => {
						return (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{item.period}</td>
								<td>{item.Balance}</td>
								<td>{item.BalancePerAddress}</td>
								<td>{item.isAwarding.toString()}</td>
								<td>{item.lotteryStruct}</td>
								<td>
									<Button
										variant="primary"
										onClick={() => handleShow(i)}
										disabled={!item.isAwarding}
									>
										กดเพื่อดูว่าใครถูกบ้าง
									</Button>
								</td>
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
							</tr>
						);
					})}
				</tbody>
			</Table>

			
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
		</Wepper>
	);
};

const Wepper = styled.div``;

export default Award;
