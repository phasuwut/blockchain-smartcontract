import React, { useEffect, useState } from "react";

import MasterLayout from "../../Layout/MasterLayout/MasterLayout";
import { lotteryManeger } from "../../../util/lottery";

const ContactUs = () => {
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
			<div>Home</div>
			{manager}
		</MasterLayout>
	);
}

export default ContactUs