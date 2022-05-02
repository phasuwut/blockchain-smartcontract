import React, { useEffect, useMemo, useState } from "react";
import { getMyDetailBuyer, getMyLotteryByPeriod } from "util/lottery";

import Center from "components/Gobal/Center/Center";
import Loading from "components/Gobal/Loading/Loading";
import MasterLayout from "components/Layout/MasterLayout/MasterLayout";
import Select from "react-select";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const MyHistory = () => {
	const [browserIsCannotMetamask, setBrowserIsCannotMetamask] = useState(false);
	const [isCannotMetamask, setIsCannotMetamask] = useState(false);
	const [myAddress, setMyaddress] = useState("");
	const [myDetail, setMyDetail] = useState({});
	const [myPreiod, setMyPreiod] = useState([]);
	const [myListLottery, setMyListLottery] = useState([]);
	const [selectPreiod, setSelectPreiod] = useState("");
	const [isLoading, setLsLoading] = useState(true);

	useMemo(() => {
		const fetchData = () => {
			const { ethereum } = window;

			// getMyAddress
			ethereum.request({ method: "eth_accounts" }).then((res) => {
				const MyAddress = res[0];

				if (MyAddress) {
					setIsCannotMetamask(true);
					setMyaddress(MyAddress);
					getMyDetailBuyer(MyAddress).then((res) => {
						setMyDetail(res);

						setMyPreiod(
							(res[3] || []).map((item) => ({
								value: item,
								label: item,
							}))
						);
						if (res[3].length > 0) {
							const arr = res[3];
							setSelectPreiod(arr[arr.length - 1]);
						}
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
				const myNumberLottery = await getMyLotteryByPeriod(myAddress, selectPreiod);
				const arr2 = [];
				(myNumberLottery || []).map((item) => {
					arr2.push({ number: item, address: `${item}${selectPreiod}` });
				});
				setMyListLottery(arr2);
				setLsLoading(false);
			}
		};
		if (myPreiod.length > 0) {
			fetchData();
		}
	}, [myPreiod, selectPreiod]);

	return (
		<MasterLayout>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{browserIsCannotMetamask ? (
						<>
							{isCannotMetamask ? (
								<>
									<div className="flex justify-center">
										<div className="w-11/12">
											<div className="w-full">
												<br />
												<h4 style={{ textAlign: "center" }}>ประวัติการซื้อของฉัน</h4>

												{myPreiod.length > 0 ? (
													<>
														<div className="flex justify-between ">
															<p>{`งวด ${selectPreiod}`}</p>
															<Select
																options={myPreiod}
																defaultValue={myPreiod[myPreiod.length - 1]}
																onChange={(values) => {
																	console.log("values.value")
																	console.log(values.value)
																	setSelectPreiod(values.value);
																}}
															/>
														</div>

														<CustomTable striped bordered hover>
															<thead>
																<tr>
																	<th>#</th>
																	<th>เลข</th>
																	<th>Address</th>
																</tr>
															</thead>
															<tbody>
																{myListLottery.map((item, i) => {
																	return (
																		<tr key={i}>
																			<td>{i + 1}</td>
																			<td>{item.number}</td>
																			<td>{item.address}</td>
																		</tr>
																	);
																})}
															</tbody>
														</CustomTable>
													</>
												) : null}
											</div>
										</div>
									</div>
								</>
							) : (
								<Center>
									<h1> Please Connect metamask</h1>
								</Center>
							)}
						</>
					) : (
						<Center>
							<h1> Please change browser</h1>
						</Center>
					)}
				</>
			)}
		</MasterLayout>
	);
};
const CustomTable = styled(Table)`
	background-color: snow;
`;

export default MyHistory;
