import Center from "components/Gobal/Center/Center";
import React from "react";
import ReactLoading from "react-loading";
const Loading = () => {
	return (
		<Center>
			<h1> Loading</h1>
			<ReactLoading color={"black"} />
		</Center>
	);
};

export default Loading;
