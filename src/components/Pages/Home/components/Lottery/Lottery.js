import React, { useEffect, useState, useMemo } from "react";
import { Table, Button } from "react-bootstrap";
import {
	getPeriodDetail,
	getLotteryDetailByAddress,
	isRegistor as getIsRegistor,
	buyingLottery
} from "../../../../../util/lottery";

const Lottery = ({ period }) => {
	const [myAddress, setMyaddress] = useState("");
	const [isRegistor, setIsRegistor] = useState(false);
	const [status, setStatus] = useState("");
	useMemo(() => {
		const fetchData = () => {
			const { ethereum } = window;
			ethereum.request({ method: "eth_accounts" }).then((res) => {
				const MyAddress = res[0];
				setMyaddress(MyAddress);
			});
		};
		fetchData();
	}, []);
	useEffect(() => {
		if (myAddress !== "") {
			getIsRegistor(myAddress).then((res) => {
				//console.log(res);
				setIsRegistor(res)
			});
		}
	}, [myAddress]);

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

			setListLottery(arr);
		};
		fetchMessage();
	}, [period]);

	const handleOnBuy = (item) => {
		console.log(item);
		console.log(myAddress);
		buyingLottery(myAddress,item.number,period).then((res)=>{
			console.log(res)
			setStatus(res)
		})
	};



	return (
		<div>
			<hr />
			<p>{`Period => ${period}`}</p>
			<p id="status">{status}</p>
			<Table>
				<thead>
					<tr>
						<th>Number</th>
						<th>Amount</th>
						<th>Address</th>
						<th>Address ของคนที่ซื้อไป</th>
						<th>ซื้อ</th>
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
								<td>
									<Button
										variant="primary"
										disabled={item.amount === "0" || !isRegistor}
										onClick={() => handleOnBuy(item)}
									>
										ซื้อ
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<hr />
		</div>
	);
};

export default Lottery;
