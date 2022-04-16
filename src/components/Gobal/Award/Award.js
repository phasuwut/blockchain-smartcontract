import { Button, Table } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { awarding, getAward, getPeriodAll, lotteryManeger } from "../../../util/lottery";

import { getCurrentWalletConnected } from "../../../lib/interact";

const Award = () => {
	const [periodAll, setPeriodAll] = useState([]);
	const [listAward, setListAward] = useState([]);
	const [isManeger, setIsManeger] = useState(false);

	const [manager, setManeger] = useState("");
	const [myAddress, setMyAddress] = useState("");
	const [status, setStatus] = useState("");

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
		console.log(item);
		awarding(myAddress, item.period).then((res) => {
			console.log(res);
			setStatus(res);
		});
	};

	return (
		<div>
			<h4>PeriodAll</h4>

			<Table>
				<thead>
					<tr>
						<th>period</th>
						<th>Balance</th>
						<th>BalancePerAddress</th>
						<th>isAwarding</th>
						<th>เลขอะไร</th>

						{isManeger ? <th> ออกสลาก</th> : null}
					</tr>
				</thead>
				<tbody>
					{listAward.map((item, i) => {
						return (
							<tr key={i}>
								<td>{item.period}</td>
								<td>{item.Balance}</td>
								<td>{item.BalancePerAddress}</td>
								<td>{item.isAwarding.toString()}</td>
								<td>{item.lotteryStruct}</td>
								<td>{item.listAddress.toString()}</td>
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

			<hr />

			<p id="status">{status}</p>
		</div>
	);
};

export default Award;
