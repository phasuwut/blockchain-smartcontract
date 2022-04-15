import React, { useEffect, useState } from "react";
import { generateLottery, lotteryManeger } from "../../../util/lottery";

import Manager from "./components/Manager/Manager";
import ManagerLess from "./components/ManagerLess/ManagerLess";
import MasterLayout from "../../Layout/MasterLayout/MasterLayout";
import { getCurrentWalletConnected } from "../../../lib/interact";

const BackOffice = () => {
	const [manager, setManeger] = useState("");
	const [myAddress, setMyAddress] = useState("");


	useEffect(() => {
		const fetch = () => {
			lotteryManeger().then((res) => {
				console.log(res);
				setManeger(res);
			});
			getCurrentWalletConnected().then((res) => {
				console.log(res);
				setMyAddress(res.address);
			});
		};

		fetch();
	}, []);

	useEffect(() => {}, [manager]);
	//console.log(manager.toUpperCase() === myAddress.toUpperCase());

	return (
		<MasterLayout>
			<div>
				{manager !== "" ? (
					<>
						{manager.toUpperCase() === myAddress.toUpperCase() ? (
							<Manager  myAddress={ myAddress}/>
						) : <ManagerLess/>}
					</>
				) :  <ManagerLess/>}
			</div>
		</MasterLayout>
	);
};

export default BackOffice;
