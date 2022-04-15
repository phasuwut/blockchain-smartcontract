import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getPeriodDetail, getLotteryDetailByAddress } from "../../../../../util/lottery";

const Lottery = ({ period }) => {
	const [listLottery, setListLottery] = useState([]);
	console.log(period);
	useEffect(() => {
		const fetchMessage = async () => {
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
		};
		fetchMessage();
	}, [period]);

	return (
		<div>
			<hr/>
			<p>{`Period => ${period}`}</p>

			<Table>
				<thead>
					<tr>
						<th>Number</th>
						<th>Amount</th>
						<th>Address</th>
						<th>Address ของคนที่ซื้อไป</th>
					</tr>
				</thead>
				<tbody>
					{listLottery.map((item, i) => {
						return (
							<tr key={i}>
								<td>{item.number}</td>
								<td>{item.amount}</td>
								<td>{item.address}</td>
								<td>{item.listAddress.toString()}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<hr/>
		</div>
	);
};

export default Lottery;
