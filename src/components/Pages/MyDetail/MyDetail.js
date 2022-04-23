import { Button, Table } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { getMyDetailBuyer, getMyLotteryByPeriod } from "util/lottery";

import MasterLayout from "components/Layout/MasterLayout/MasterLayout";

const MyDetail = () => {
	const [browserIsCannotMetamask, setBrowserIsCannotMetamask] = useState(false);
	const [isCannotMetamask, setIsCannotMetamask] = useState(false);
	const [myAddress, setMyaddress] = useState("");
	const [myDetail, setMyDetail] = useState({});
	const [myListLottery, setMyListLottery] = useState([]);
	//called only once
	useEffect(() => {
		const fetchData = () => {
			const { ethereum } = window;

			// getMyAddress
			ethereum.request({ method: "eth_accounts" }).then((res) => {
				const MyAddress = res[0];

				if (MyAddress) {
					setIsCannotMetamask(true);
					setMyaddress(MyAddress);
					getMyDetailBuyer(MyAddress).then((res) => {
						console.log(res);
						setMyDetail(res);
					});
				} else {
					setIsCannotMetamask(false);
				}
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
		const fetchData = async () => {
			if (isCannotMetamask) {
				const arr = [];
				const Period = myDetail[3] || [];
				for (let i = 0; i < Period.length; i++) {
					const myNumberLottery = await getMyLotteryByPeriod(myAddress, Period[i]);

					const arr2 = [];
					(myNumberLottery || []).map((item) => {
						arr2.push({ number: item, address: `${Period[i]}${item}` });
					});
					arr.push({ period: Period[i], listNeuber: arr2 });
				}
				console.log(arr);
				setMyListLottery(arr);
			}
		};
		fetchData();
	}, [myDetail]);

	return (
		<MasterLayout>
			<>
				{browserIsCannotMetamask ? (
					<div>
						<h1>MyDetail</h1>
						{isCannotMetamask ? (
							<div>
								<p>{`myAddress => ${myAddress}`}</p>
								{isCannotMetamask ? (
									<ul>
										{<li>{`First name => ${myDetail[0]}`}</li>}
										{<li>{`Last name => ${myDetail[1]}`}</li>}
										{<li>{`Email => ${myDetail[2]}`}</li>}
									</ul>
								) : null}
								{myListLottery.map((item, i) => {
									return (
										<div key={i}>
											<hr/>
											<p>{`Period => ${item.period}`}</p>
											<Table>
												<thead>
													<tr>
													<th>#</th>
														<th>Number</th>
														<th>Address</th>
													</tr>
												</thead>
												<tbody>
													{item.listNeuber.map((item, j) => {
														return (
															<tr key={j}>
																	<td>{j+1}</td>
																<td>{item.number}</td>

																<td>{item.address}</td>
															</tr>
														);
													})}
												</tbody>
											</Table>
											<hr/>
										</div>
									);
								})}
							</div>
						) : (
							<h1> Please Connect metamask</h1>
						)}
					</div>
				) : (
					<div>
						<h1> Please change browser</h1>
					</div>
				)}
			</>
		</MasterLayout>
	);
};

export default MyDetail;
