import React, { useEffect, useState } from "react";

import MasterLayout from "../../../../../Layout/MasterLayout/MasterLayout";
import { lotteryManeger } from "../../util/interact";

const Home = () => {
	console.log(lotteryManeger);

	const [manager, setManeger] = useState("");

	//called only once
	useEffect(async () => {
		async function fetchMessage() {
			const message = await lotteryManeger();
			console.log(message);
			setManeger(message);
		}
		fetchMessage();
	}, []);

	return (
		<MasterLayout>
			<h1> Maneger</h1>
			<div>Home</div>
			{manager}
		</MasterLayout>
	);
};

export default Home;
