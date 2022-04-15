import MasterLayout from "../../../components/Layout/MasterLayout/MasterLayout";
import React, { useState, useEffect } from "react";
import { getPeriodAll} from "../../../util/lottery";

import Lottery from "./components/Lottery/Lottery";
const HomePage = () => {
	const [periodAll, setPeriodAll] = useState([]);

	//called only once
	useEffect(() => {
		const fetchMessage = () => {
			getPeriodAll().then((res) => {
				console.log(res);
				setPeriodAll(res);
			});
		};
		fetchMessage();
	}, []);

	return (
		<MasterLayout>
			<>
				<div>Home</div>
				<h1>Lottery</h1>
				{periodAll.map((item, i) => {
					return <Lottery period={item} key={i} />;
				})}
			</>
		</MasterLayout>
	);
};

export default HomePage;
