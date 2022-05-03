import React, { useMemo, useState } from "react";

import Loading from "components/Gobal/Loading/Loading";
import Lottery from "components/Pages/Home/components/Lottery/Lottery";
import MasterLayout from "components/Layout/MasterLayout/MasterLayout";
import { getPeriodAll } from "util/lottery";

const HomePage = () => {
	const [isLoading, setLsLoading] = useState(true);

	const [periodLast, setPeriodLast] = useState([]);
	useMemo(() => {
		const fetch = () => {
			getPeriodAll().then((res) => {
				if (res.length > 0) {
					setPeriodLast([res[res.length - 1]]);
				}
				//setLsLoading(false);
			});
		};
		fetch();
	}, []);

	return (
		<MasterLayout>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<br />
					<h1 className="text-center">{`รายการซื้อ - ขาย ล็อตเตอรี่ งวด ${periodLast[0]}`}</h1>
					{periodLast.map((item, i) => {
						return <Lottery period={item} key={i} />;
					})}
				</>
			)}
		</MasterLayout>
	);
};

export default HomePage;
