import React, { useEffect, useState } from "react";
import { getAward, getLotteryDetailByAddress, getPeriodDetail } from "util/lottery";

import Center from "components/Gobal/Center/Center";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const Lottery = ({ period }) => {
	const [isAwarding, setIsAwarding] = useState(true);
	const [listLottery, setListLottery] = useState([]);

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

			const award = await getAward(period);
			setIsAwarding(award.isAwarding);

			setListLottery(arr);
		};
		fetchMessage();
	}, [period]);

	return (
		<div>
			<hr />
			<Center>
				<div>
					<p>{`สถานะการออกรางวัล ${isAwarding ? "ออกรางวัลไปแล้ว":"ยังไม่ได้ออกรางวัล"}`}</p>
					<CustomTable striped bordered hover>
						<thead>
							<tr>
								<th>หมายเลขล็อตเตอรี่</th>
								<th>จำนวนคงเหลือ (ใบ)</th>
								<th>Address ล็อตเตอรี่</th>
								<th>Address ผู้ซื้อ</th>
							</tr>
						</thead>
						<tbody>
							{listLottery.map((item, i) => {
								return (
									<tr key={i}>
										<td>{item.number}</td>
										<td>{item.amount}</td>
										<td>{item.address}</td>
										<td>
											<ul>
												{item.listAddress.map((item2, j) => {
													return <li key={j}>{item2}</li>;
												})}
											</ul>
										</td>
									</tr>
								);
							})}
						</tbody>
					</CustomTable>
				</div>
			</Center>
		</div>
	);
};

const CustomTable = styled(Table)`
	background-color: snow;
`;

export default Lottery;
