import React from "react";
import styled from "styled-components";

const Flex = ({ children }) => {
	return <CustomFlex>{children}</CustomFlex>;
};
const CustomFlex = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export default Flex;
