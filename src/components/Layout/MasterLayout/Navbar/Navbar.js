import { Button, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";

import React from "react";

const MasterLayoutNavbar = () => {
	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="/">Block Chain</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="search">search</Nav.Link>
					<Nav.Link href="history">history</Nav.Link>
					<NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<Button variant="outline-success">Buttom</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default MasterLayoutNavbar;
