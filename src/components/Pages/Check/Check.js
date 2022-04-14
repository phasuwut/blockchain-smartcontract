import React, { useEffect, useState } from "react";
import { getMyBalance, getMyaddress, getPeriodAll } from "../../../util/lottery";

import MasterLayout from "../../Layout/MasterLayout/MasterLayout";

const Check = () => {
	const [myaddress, setMyaddress] = useState("");
	const [myBalance, setMyBalance] = useState("");
	const [periodAll, setPeriodAll] = useState("");
	//called only once
	useEffect(() => {
		const fetchMessage = () => {
			getMyaddress().then((res) => {
				console.log(res);
				setMyaddress(res);
			});
			getMyBalance().then((res) => {
				console.log(res);
				setMyBalance(res);
			});
		};
		 fetchMessage();
	}, []);

	return (
		<MasterLayout>
			<div>
				<h1>Check All</h1>
				<p>{`getMyaddress => ${myaddress}`}</p>
				<p>{`getMyBalance => ${myBalance}`}</p>
				<p>{`getPeriodAll => ${periodAll}`}</p>
			</div>
		</MasterLayout>
	);
};

export default Check;
