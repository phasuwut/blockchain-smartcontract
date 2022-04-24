import React from "react";
import styled from "styled-components";

const Flex = ({ children , onClick}) => {
	return <CustomFlex onClick={onClick}>{children}</CustomFlex>;
};
const CustomFlex = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export default Flex;
