import React, { useEffect, useState } from "react";
import { getAward, getLotteryDetailByAddress, getPeriodAll, getPeriodDetail } from "util/lottery";

import Loading from "components/Gobal/Loading/Loading";
import Select from "react-select";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const Lotteries = () => {
	//const [periodAll, setPeriodAll] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [myPeriod, setMyPeriod] = useState([]);
	const [selectPreiod, setSelectPreiod] = useState("");
	const [select, setSelect] = useState(0);
	const [listLottery, setListLottery] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const periodAll = await getPeriodAll();
			//setPeriodAll(periodAll);
			setMyPeriod(
				periodAll.map((item) => ({
					value: item,
					label: item,
				}))
			);
			const arr = [];
			for (let i = 0; i < periodAll.length; i++) {
				const periodDetail = await getPeriodDetail(periodAll[i]);
				const arr2 = [];
				for (let j = 0; j < periodDetail.length; j++) {
					const address = `${periodDetail[j]}${periodAll[i]}`;
					const lotteryDetailByAddress = await getLotteryDetailByAddress(
						periodDetail[j],
						periodAll[i]
					);
					arr2.push({
						address: address,
						number: periodDetail[j],
						listAddress: lotteryDetailByAddress.listAddress,
						amount: lotteryDetailByAddress.amount,
					});
				}

				const award = await getAward(periodAll[i]);
				arr.push({
					period: periodAll[i],
					listLoyttery: arr2,
					isAwarding: award.isAwarding,
				});
			}
			setListLottery(arr);
			setIsLoading(false);
		};
		fetchData();
	}, []);


	return (
		<Wapper>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div className="flex justify-between ">
						<p>{`งวด ${selectPreiod}`}</p>
						<Select
							options={myPeriod}
							defaultValue={myPeriod[myPeriod.length - 1]}
							onChange={(values) => {
								setSelectPreiod(values.value);
								setSelect(myPeriod.findIndex((item) => item.value === values.value));
							}}
						/>
					</div>
					<p>{`สถานะการออกรางวัล ${
						listLottery[select].isAwarding ? "ออกรางวัลไปแล้ว" : "ยังไม่ได้ออกรางวัล"
					}`}</p>
					<CustomTable bordered hover responsive striped className="text-center">
						<thead>
							<tr>
								<th>#</th>
								<th>หมายเลขล็อตเตอรี่</th>
								<th>จำนวนคงเหลือ (ใบ)</th>
								<th>Address ล็อตเตอรี่</th>
								<th>Address ผู้ซื้อ</th>
							</tr>
						</thead>
						{(listLottery[select].listLoyttery || []).map((item, i) => {
							return (
								<tr key={i}>
									<td>{i + 1}</td>
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
					</CustomTable>
				</>
			)}
		</Wapper>
	);
};

const Wapper = styled.div``;
const CustomTable = styled(Table)`
	background-color: snow;
`;

export default Lotteries;
