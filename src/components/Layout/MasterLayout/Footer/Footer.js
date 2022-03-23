import styled from "styled-components";
const Footer = () => {
	return <WepperFooter className="footer">footer</WepperFooter>;
};

const WepperFooter = styled.footer`
	background-color: green;
	border-top: 2px solid red;
	position: fixed;
	width: 100%;
	bottom: 0;
	color: white;
	font-size: 25px;
`;
export default Footer;
