import React, { useEffect, useState } from "react";
import {
	buyersRegister,
	getBuyerResult,
	getMyBalance,
	getMyaddress,
	getPeriodAll,
	isRegistor,
} from "../../../util/lottery";

import MasterLayout from "../../Layout/MasterLayout/MasterLayout";
import { getCurrentWalletConnected } from "../../../lib/interact";
import Register from "../../Gobal/Register/Register"

const Check = () => {
	const [myAddress, setMyaddress] = useState("");
	const [myBalance, setMyBalance] = useState("");
	const [periodAll, setPeriodAll] = useState("");
	const [listBuyer, setListBuyer] = useState([]);
	const [isShowRegistor, setIsShowRegistor] = useState(true);
	
	//called only once
	useEffect(() => {
		const fetchMessage = () => {
			const { ethereum } = window;
			getCurrentWalletConnected().then((res) => {
				const { address } = res;
				setMyaddress(address);
			});
			getBuyerResult().then((res) => {
				console.log(res);
				setListBuyer(res);
			});

			// getMyAddress
			ethereum.request({ method: "eth_accounts" }).then((res) => {
				const MyAddress = res[0];
				isRegistor(MyAddress).then((res) => {
					console.log(res);
					setIsShowRegistor(!res)
				});
				getMyBalance(MyAddress).then((res) => {
					console.log(res);
					setMyBalance(res);
					
				});
			});
		};
		fetchMessage();
	}, []);

	return (
		<MasterLayout>
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
				<Register myAddress={myAddress}/>
				{
					isShowRegistor?(<Register/>):null
				}
			
			</div>
		</MasterLayout>
	);
};

export default Check;
