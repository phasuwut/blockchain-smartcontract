import MasterLayout from "../../../components/Layout/MasterLayout/MasterLayout";
import React from "react";
import SmartContract from "../SmartContract/SmartContract";
const HomePage = () => {
	return (
		<MasterLayout>
			<>
				<div>Home</div>
				<SmartContract/>
			</>
		</MasterLayout>
	);
};

export default HomePage;
