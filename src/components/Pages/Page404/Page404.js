import React from "react";
import styled from "styled-components";
const Page404Page = () => {
	return (
		<Wepper>
			<div className="page-error">Page404</div>
		</Wepper>
	);
};

const Wepper = styled.div`
	.page-error {
		width: 100px;
		background-color: green;
	}
`;

export default Page404Page;
