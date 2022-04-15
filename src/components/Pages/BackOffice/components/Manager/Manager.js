import React, { useState } from "react";

import { generateLottery } from "../../../../../util/lottery";

const Manager = ({ myAddress }) => {
	const [period, setPeriod] = useState("");
	const handleonSubmitGenerateLottery = (event) => {
		event.preventDefault();
        console.log(period)
		generateLottery(myAddress, period).then((res) => {
			console.log(res);
		});
	};
	return (
		<div>
			<h1>BackOffice manager</h1>
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
		</div>
	);
};

export default Manager;
