import React, { Fragment } from "react";

import Footer from "components/Layout/MasterLayout/Footer/Footer";
import Navbar from "components/Layout/MasterLayout/Navbar/Navbar";
import styled from "styled-components";

const MasterLayout = ({ children }) => {
	return (
		<WepperMasterLayout>
			<Navbar />
			<>{children}</>
			<Footer></Footer>
		</WepperMasterLayout>
	);
};
/* MasterLayout.PropTypes = {
	//children: ReactNode,
}; */

const WepperMasterLayout = styled.div`
	width: 100vw;
	height: 100vh;
`;
export default MasterLayout;
