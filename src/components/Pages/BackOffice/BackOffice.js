import React, { useEffect, useState } from "react";
import { generateLottery, lotteryManeger } from "../../../util/lottery";

import MasterLayout from "../../Layout/MasterLayout/MasterLayout";
import { getCurrentWalletConnected } from "../../../lib/interact";

const BackOffice = () => {
	const [manager, setManeger] = useState("");
	const [myAddress, setMyAddress] = useState("");
	//called only once

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

	const [period, setPeriod] = useState("");
	const handleonSubmitGenerateLottery = (event) => {
		event.preventDefault();

		console.log("  handleonSubmitGenerateLottery");
		generateLottery(myAddress, period).then((res) => {
			console.log(res);
		});
	};

	return (
		<MasterLayout>
			<div>
				{manager !== "" ? (
					<>
						{manager.toUpperCase() === myAddress.toUpperCase() ? (
							<>
								<h1>BackOffice</h1>
								<hr />
								<form onSubmit={handleonSubmitGenerateLottery}>
									<p>generateLottery</p>
									<input
										placeholder="period"
										type={"text"}
										value={period}
										onChange={(event) => {
											setPeriod(event.target.value);
										}}
									/>
									<button> generateLottery</button>
								</form>
								<hr />
							</>
						) : null}
					</>
				) : null}
			</div>
		</MasterLayout>
	);
};

export default BackOffice;
