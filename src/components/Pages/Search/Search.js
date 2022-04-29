import MasterLayout from "../../../components/Layout/MasterLayout/MasterLayout";
import React from "react";
import styled from "styled-components";
import { Card, Row, Col, Button, Modal } from 'react-bootstrap';
// import { BsFillBasket3Fill } from "react-icons/bs";
import { useEffect, useState, useMemo } from "react";
import {
	buyingLottery,
	isRegistor as getIsRegistor,
	getLotteryDetailByAddress,
	getPeriodDetail,
} from "../../../util/lottery";



// function BuyLottery() {
// 	const [show, setShow] = useState(false);
// 	const handleClose = () => setShow(false);
// 	const handleShow = () => setShow(true);
// 	return (
// 		<>
// 			<Button variant="warning" onClick={handleShow}>
// 				ซื้อ
// 			</Button>

// 			<Modal show={show} onHide={handleClose}>
// 				<Modal.Header closeButton>
// 					<Modal.Title >ยืนยันการซื้อล็อตเตอรี่</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body>คุณต้องการยืนยันการซื้อล็อตเตอรี่ใช่หรือไม่ ?</Modal.Body>
// 				<Modal.Footer>
// 					<Button variant="secondary" onClick={() => handleOnBuy(item)}>
// 						ปิด
// 					</Button>
// 					<Button variant="warning" onClick={handleClose}>
// 						ซื้อ
// 					</Button>
// 				</Modal.Footer>
// 			</Modal>
// 		</>
// 	);
// }

// function AddBasket() {
// 	const [show, setShow] = useState(false);

// 	const handleClose = () => setShow(false);
// 	const handleShow = () => setShow(true);

// 	return (
// 		<>
// 			<Button variant="primary" onClick={handleShow}>
// 				ใส่รถเข็น
// 			</Button>

// 			<Modal show={show} onHide={handleClose}>
// 				<Modal.Header closeButton>
// 					<Modal.Title>Modal heading</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
// 				<Modal.Footer>
// 					<Button variant="secondary" onClick={handleClose}>
// 						Close
// 					</Button>
// 					<Button variant="warning" onClick={handleClose}>
// 						Save Changes
// 					</Button>
// 				</Modal.Footer>
// 			</Modal>
// 		</>
// 	);
// }



const SearchPage = () => {
	const [myAddress, setMyaddress] = useState("");
	const [isRegistor, setIsRegistor] = useState(false);
	const [status, setStatus] = useState("");
	const [isAwarding, setIsAwarding] = useState(true);
	const [browserIsCannotMetamask, setBrowserIsCannotMetamask] = useState(false);

	useMemo(() => {
		const fetchData = () => {
			const { ethereum } = window;
			ethereum.request({ method: "eth_accounts" }).then((res) => {
				const MyAddress = res[0];
				setMyaddress(MyAddress);
			});
		};

		if (window.ethereum) {
			setBrowserIsCannotMetamask(true);
			fetchData();
		} else {
			setBrowserIsCannotMetamask(false);
		}
	}, []);

	useEffect(() => {
		if (myAddress !== "") {
			getIsRegistor(myAddress).then((res) => {
				setIsRegistor(res);
			});
		}
	}, [myAddress]);

	const [listLottery, setListLottery] = useState([]);
	const period = "16052022";
	useEffect(() => {
		const fetchMessage = async () => {
			const arr = [];
			const periodDetail = await getPeriodDetail(period);
			for (let i = 0; i < periodDetail.length; i++) {
				const address = `${periodDetail[i]}${period}`;
				const lotteryDetailByAddress = await getLotteryDetailByAddress(periodDetail[i], period);
				arr.push({
					address: address,
					number: periodDetail[i],
					listAddress: lotteryDetailByAddress.listAddress,
					amount: lotteryDetailByAddress.amount,
				});
			}

			setListLottery(arr);
		};
		fetchMessage();
	}, [period]);

	const handleOnBuy = (item) => {
		buyingLottery(myAddress, item.number, period).then((res) => {
			console.log(res);
			setStatus(res);
		});
	};
	var [search, setSearch] = useState("");
	const handleChange = e => {
		// setSearchField(e.target.value);
		if(e.target.value===""){
			setSearch("")
		}
		else {
			setSearch(e.target.value)
		}
	  };

	console.log(listLottery)



	return (
		<MasterLayout>
			<Wepper>
				<br />

				<form action="/" method="get">

					<br />

					<div className="form-group">
						<Row className="justify-content-md-center">
							<Col md={{ span: 8 }}><input type="text" className="form-control" placeholder="Search" onChange = {handleChange}/></Col>
							{/* <Col md={{ span: 2 }}><button type="button" className="btn btn-warning btn-lg btn-block" >Search</button></Col> */}
						</Row>

					</div>
				</form>
				<br />
	
				<div class="container">
					<Row className="justify-content-md-center">
						{listLottery.filter(lotery => lotery.number.includes(search)).map((item, i) => {
							return (
									<Card style={{ width: '30rem', marginLeft: '3%', border: '3px solid #ffc107', backgroundColor: 'cornsilk' }}>
										<Card.Body>
											<Card.Title>งวดวันที่ : {period.substring(0, 2)} {period.substring(2, 4)} {parseInt(period.substring(4)) + 543}</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">คงเหลือ : {item.amount} ใบ</Card.Subtitle>
											<Card.Text>
												<h3 style={{ textAlign: 'center' }}>{item.number}</h3>
											</Card.Text>
											<Row><Col md={{ span: 2 }}><Button
										variant="primary"
										disabled={
											item.amount === "0" || !isRegistor || !browserIsCannotMetamask || isAwarding
										}
										onClick={() => handleOnBuy(item)}
									>
										ซื้อ
									</Button></Col>
												{/* <Col md={{ span: 3 }}><AddBasket /></Col> */}
												</Row>
										</Card.Body>
									</Card>
								// 	<Button
								// 	variant="primary"
								 	// disabled={
								 	// 	item.amount === "0" || !isRegistor || !browserIsCannotMetamask || isAwarding
									// }
								// 	onClick={() => handleOnBuy(item)}
								// >
								// 	ซื้อ
								// </Button>
							);
						})}
					
					</Row>
				</div>
				<br/><br/>
			</Wepper>
		</MasterLayout>
	);
};
const Wepper = styled.div``;
export default SearchPage;
