import React from "react";
import styled from "styled-components";

const Center = ({ children }) => {
	return (
		<Wapper>
			<WapperCenter>{children}</WapperCenter>
		</Wapper>
	);
};
const Wapper = styled.div`
	width: 100vw;
	height: 100vh;
`;
const WapperCenter = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

export default Center;
