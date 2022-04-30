import Center from "components/Gobal/Center/Center";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Page404Page = () => {
	return (
		<Wepper>
			<Center>
				<Link to="/home">
					<h1> 404</h1>
				</Link>
			</Center>
		</Wepper>
	);
};

const Wepper = styled.div``;

export default Page404Page;
