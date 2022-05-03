import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loading = () => {
	return (
		<WapperCenter>
			<h1> Loading</h1>
			<ReactLoading color={"black"} />
		</WapperCenter>
	);
};
const WapperCenter = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;
export default Loading;
