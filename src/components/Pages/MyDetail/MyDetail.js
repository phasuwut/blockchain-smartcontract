import React, { useEffect, useMemo, useState } from "react";
import MasterLayout from "../../../components/Layout/MasterLayout/MasterLayout";
import {getMyDetailBuyer} from "../../../util/lottery";

const MyDetail = () => {
    const [myAddress, setMyaddress] = useState("");
    //called only once
	useEffect(() => {
		const fetchMessage = () => {
			const { ethereum } = window;

			// getMyAddress
			ethereum.request({ method: "eth_accounts" }).then((res) => {
				const MyAddress = res[0];
				getMyDetailBuyer(MyAddress).then((res)=>{
                    console.log(res)
                })
			});
		};
		fetchMessage();
	}, []);
	return (
		<MasterLayout>
			<div>MyDetail</div>
		</MasterLayout>
	);
};

export default MyDetail;
