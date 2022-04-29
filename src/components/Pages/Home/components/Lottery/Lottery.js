import { Button, Table } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import {
	buyingLottery,
	getAward,
	isRegistor as getIsRegistor,
	getLotteryDetailByAddress,
	getPeriodDetail,
} from "util/lottery";

const Lottery = ({ period }) => {
	const [myAddress, setMyaddress] = useState("");
	const [isRegistor, setIsRegistor] = useState(false);
	const [status, setStatus] = useState("");
	const [isAwarding, setIsAwarding] = useState(true);
	const [browserIsCannotMetamask, setBrowserIsCannotMetamask] = useState(false);

	useMemo(() => {
		const fetchData = async () => {
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
		if (myAddress !== "") {
			getIsRegistor(myAddress).then((res) => {
				setIsRegistor(res);
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

			const award = await getAward(period);
			setIsAwarding(award.isAwarding);

			setListLottery(arr);
		};
		fetchMessage();
	}, [period]);

	const handleOnBuy = (item) => {
		buyingLottery(myAddress, item.number, period).then((res) => {
			console.log(res);
			setStatus(res);
		});
	};

	console.log(`${period}=> ${isAwarding}`);
	console.log(`${isRegistor}=> ${!isRegistor}`);
	console.log(`${browserIsCannotMetamask}=> ${!browserIsCannotMetamask}`);
	console.log(status);
	console.log("");


	return (
		<div>
			<hr />
			<p>{`Period => ${period}`}</p>
			<p id="status">{status.status}</p>
			<div className="div-tb">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>หมายเลขล็อตเตอรี่</th>
						<th>จำนวนคงเหลือ</th>
						<th>Address ล็อตเตอรี่</th>
						<th>Address ผู้ซื้อ</th>
						{/* <th>ซื้อ</th> */}
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
								{/* <td>
									<Button
										variant="primary"
										disabled={
											item.amount === "0" || !isRegistor || !browserIsCannotMetamask || isAwarding
										}
										onClick={() => handleOnBuy(item)}
									>
										ซื้อ
									</Button>
								</td> */}
							</tr>
						);
					})}
				</tbody>
			</Table>
			</div>
			{/* <hr /> */}
		</div>
	);
};

export default Lottery;
