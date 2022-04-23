import React, { useEffect, useState } from "react";

import Lottery from "components/Pages/Home/components/Lottery/Lottery";
import MasterLayout from "components/Layout/MasterLayout/MasterLayout";
import { getPeriodAll } from "util/lottery";

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
