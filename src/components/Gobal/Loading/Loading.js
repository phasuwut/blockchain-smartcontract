import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loading = () => {
	return (
		<WapperCenter>
			<div class="grid content-center h-full">
				<div className="w-full">
					<div className="flex justify-center">
						<ReactLoading color={"black"} type={"spinningBubbles"} />
					</div>
					<div className="flex justify-center">
						<h1 className="flex justify-center"> Loading</h1>
					</div>
				</div>
			</div>
		</WapperCenter>
	);
};
const WapperCenter = styled.div`
	width: 100%;
	height: 100vh;
`;
export default Loading;
