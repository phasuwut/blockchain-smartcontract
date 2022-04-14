import React, { useEffect, useState } from "react";
import {
	buyersRegister,
	getBuyerResult,
	getMyBalance,
	getMyaddress,
	getPeriodAll,
} from "../../../util/lottery";

import MasterLayout from "../../Layout/MasterLayout/MasterLayout";
import { getCurrentWalletConnected } from "../../../lib/interact";

const Check = () => {
	const [myaddress, setMyaddress] = useState("");
	const [myBalance, setMyBalance] = useState("");
	const [periodAll, setPeriodAll] = useState("");
	const [listBuyer, setListBuyer] = useState([]);
	//called only once
	useEffect(() => {
		const fetchMessage = () => {
			getCurrentWalletConnected().then((res) => {
			
				const { address } = res;
				setMyaddress(address);
				/* 				getMyaddress(address).then((res2) => {
					console.log("res2");
					console.log(res2);
					//setMyaddress(res);
				}); */
			});

			getMyBalance().then((res) => {
				console.log(res);
				setMyBalance(res);
			});
			getBuyerResult().then((res) => {
				console.log(res);
				setListBuyer(res);
			});
		};
		fetchMessage();
	}, []);

	const handleRegister = () => {
		console.log(" handleRegister")
		buyersRegister(myaddress,"test-1","test-2","test-3").then((res)=>{
			console.log(res)
		})
	};
	return (
		<MasterLayout>
			<div>
				<h1>Check All</h1>
				<p>{`getMyaddress => ${myaddress}`}</p>
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
				<button onClick={handleRegister}> Register</button>
			</div>
		</MasterLayout>
	);
};

export default Check;
