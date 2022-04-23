import { useDispatch, useSelector } from "react-redux";

import MasterLayout from "components/Layout/MasterLayout/MasterLayout";
import React from "react";
import { RootState } from "store/rootReducer";
import { setProfile } from "store/profile/profile";
import styled from "styled-components";

const HistoryPage = (props) => {
	const dispatch = useDispatch();
	console.log(dispatch);
	const profileStore = useSelector((state: RootState) => state.profile);
	const etcStore = useSelector((state: RootState) => state.etc);
	console.log(profileStore);
	console.log(etcStore);

	console.log(`Build mode: ${process.env.NODE_ENV}`);
	console.log(process.env);
	return (
		<MasterLayout>
			<Wepper>
				<div>History</div>

				<button
					onClick={() => {
						console.log("22222");
						dispatch(setProfile({ name: "555", email: "666" }));
						console.log("333");
					}}
				>
					test
				</button>
				<button
					onClick={() => {
						console.log(profileStore);
					}}
				>
					test2
				</button>
				<h1>{process.env.NODE_ENV}</h1>
			</Wepper>
		</MasterLayout>
	);
};

const Wepper = styled.div``;

export default HistoryPage;
