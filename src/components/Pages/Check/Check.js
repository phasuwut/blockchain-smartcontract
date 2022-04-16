import React, { useEffect, useState } from "react";
import {
	getBuyerResult,
	getMyBalance,
	getMyaddress,
	getPeriodAll,
	isRegistor,
} from "../../../util/lottery";

import MasterLayout from "../../Layout/MasterLayout/MasterLayout";
import Register from "../../Gobal/Register/Register";
import { getCurrentWalletConnected } from "../../../lib/interact";

const Check = () => {
	const [myAddress, setMyaddress] = useState("");
	const [myBalance, setMyBalance] = useState("");
	const [periodAll, setPeriodAll] = useState([]);
	const [listBuyer, setListBuyer] = useState([]);
	const [isShowRegistor, setIsShowRegistor] = useState(true);

	const [browserIsCannotMetamask, setBrowserIsCannotMetamask] = useState(false);

	//called only once
	useEffect(() => {
		const fetchData = () => {
			const { ethereum } = window;
			getCurrentWalletConnected().then((res) => {
				const { address } = res;
				setMyaddress(address);
			});
			getBuyerResult().then((res) => {
				console.log(res);
				setListBuyer(res);
			});
			getPeriodAll().then((res) => {
				console.log(res);
				setPeriodAll(res);
			});

			// getMyAddress
			ethereum.request({ method: "eth_accounts" }).then((res) => {
				const MyAddress = res[0];
				isRegistor(MyAddress).then((res) => {
					console.log(res);
					setIsShowRegistor(!res);
				});
				getMyBalance(MyAddress).then((res) => {
					console.log(res);
					setMyBalance(res);
				});
			});
		};

		if (window.ethereum) {
			setBrowserIsCannotMetamask(true);
			fetchData();
		} else {
			setBrowserIsCannotMetamask(false);
		}
	}, []);

	return (
		<MasterLayout>
			{browserIsCannotMetamask ? (
				<div>
				
					<h1>Check All</h1>
					<p>{`getMyaddress => ${myAddress}`}</p>
					<p>{`getMyBalance => ${myBalance}`}</p>
					<p>{`getPeriodAll => ${periodAll}`}</p>

					<hr />
					<div>
						<p>ListBuyer -> </p>
						{(listBuyer || []).map((item, i) => {
							return <p key={i}>{item}</p>;
						})}
					</div>
					<hr />

					{isShowRegistor ? <Register myAddress={myAddress} /> : null}
				</div>
			) : (
				<div>
					<h1> Please change browser</h1>
				</div>
			)}
		</MasterLayout>
	);
};

export default Check;
