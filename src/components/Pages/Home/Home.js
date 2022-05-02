import React, { useMemo, useState } from "react";

import Lottery from "components/Pages/Home/components/Lottery/Lottery";
import MasterLayout from "components/Layout/MasterLayout/MasterLayout";
import { getPeriodAll } from "util/lottery";
//import { useDispatch, useSelector } from "react-redux";

//import { setLoading } from "store/loadding/loadding";

const HomePage = () => {
	/* 	const dispatch = useDispatch();
	console.log(dispatch);
	const loadingStore = useSelector((state: RootState) => state.loading); */
	// 	dispatch(setProfile({ name: "555", email: "666" }));

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
			<br />
			<h1 className="text-center">{`รายการซื้อ - ขาย ล็อตเตอรี่ งวด ${periodLast[0]}`}</h1>
			{periodLast.map((item, i) => {
				return <Lottery period={item} key={i} />;
			})}
		</MasterLayout>
	);
};

export default HomePage;
