import React, { useMemo, useState } from "react";

import Lottery from "components/Pages/Home/components/Lottery/Lottery";
import MasterLayout from "components/Layout/MasterLayout/MasterLayout";
import { getPeriodAll } from "util/lottery";

const HomePage = () => {
	//const [periodAll, setPeriodAll] = useState([]);
	const [periodLast, setPeriodLast] = useState([]);
	useMemo(() => {
		const fetch = () => {
			getPeriodAll().then((res) => {
				//setPeriodAll(res);
				if (res.length > 0) {
					setPeriodLast([res[res.length - 1]]);
				}
			});
		};
		fetch();
	}, []);

	return (
		<MasterLayout>
			<br/>
			<h1 className="text-center">{`รายการซื้อ - ขาย ล็อตเตอรี่ งวด ${periodLast[0]}`}</h1>
			{periodLast.map((item, i) => {
				return <Lottery period={item} key={i} />;
			})}
		</MasterLayout>
	);
};

export default HomePage;
