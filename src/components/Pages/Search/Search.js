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



function BuyLottery() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Button variant="warning" onClick={handleShow}>
				ซื้อ
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="warning" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

function AddBasket() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				ใส่รถเข็น
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="warning" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}


const SearchPage = () => {
	const [myAddress, setMyaddress] = useState("");
	const [isRegistor, setIsRegistor] = useState(false);
	const [status, setStatus] = useState("");
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
			console.log(periodDetail);
			console.log("4444")
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



	return (
		<MasterLayout>
			<Wepper>
				<br />

				<form action="/" method="get">

					<br />
					{/* <p>{`Period => ${period}`}</p> */}

					<div className="form-group">
						<Row className="justify-content-md-center">
							<Col md={{ span: 6 }}><input type="text" className="form-control" placeholder="Search" /></Col>
							<Col md={{ span: 2 }}><button type="button" className="btn btn-warning btn-lg btn-block">Search</button></Col>
						</Row>

					</div>
				</form>
				<br />
				{/* <Row className="justify-content-md-center">
					<Card style={{ width: '30rem', marginLeft: '3%', border: '3px solid #ffc107', backgroundColor: 'cornsilk' }}>
						<Card.Body>
							<Card.Title>งวดวันที่ : 16 เมษายน 2565</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">คงเหลือ : 10 ใบ</Card.Subtitle>
							<Card.Text>
								<h3 style={{ textAlign: 'center' }}>1 1 1 1 1 1</h3>
							</Card.Text>
							<Row><Col md={{ span: 2 }}><BuyLottery /> </Col>
								<Col md={{ span: 3 }}><AddBasket /> </Col></Row>
						</Card.Body>
					</Card>
					<Card style={{ width: '30rem', marginLeft: '3%', border: '3px solid #ffc107', backgroundColor: 'cornsilk' }}>
						<Card.Body>
							<Card.Title>งวดวันที่ : 16 เมษายน 2565</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">คงเหลือ : 30 ใบ</Card.Subtitle>
							<Card.Text>
								<h3 style={{ textAlign: 'center' }}>2 2 2 2 2 2</h3>
							</Card.Text>
							<Row><Col md={{ span: 2 }}><BuyLottery /> </Col>
								<Col md={{ span: 3 }}><AddBasket /> </Col></Row>
						</Card.Body>
					</Card>
					<Card style={{ width: '30rem', marginLeft: '3%', border: '3px solid #ffc107', backgroundColor: 'cornsilk' }}>
						<Card.Body>
							<Card.Title>งวดวันที่ : 16 เมษายน 2565</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">คงเหลือ : 5 ใบ</Card.Subtitle>
							<Card.Text>
								<h3 style={{ textAlign: 'center' }}>3 3 3 3 3 3</h3>
							</Card.Text>
							<Row><Col md={{ span: 2 }}><BuyLottery /> </Col>
								<Col md={{ span: 3 }}><AddBasket /> </Col></Row>
						</Card.Body>
					</Card>

				</Row> */}
				{/* <p>{`Period => ${period.substring(0, 2)}`}</p> <p>{`Period => ${period.substring(4)}`}</p> */}
				<div class="container">
					<Row className="justify-content-md-center">
						{listLottery.map((item, i) => {
							return (
									<Card style={{ width: '30rem', marginLeft: '3%', border: '3px solid #ffc107', backgroundColor: 'cornsilk' }}>
										<Card.Body>
											<Card.Title>งวดวันที่ : {period.substring(0, 2)} {period.substring(2, 4)} {parseInt(period.substring(4)) + 543}</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">คงเหลือ : {item.amount} ใบ</Card.Subtitle>
											<Card.Text>
												<h3 style={{ textAlign: 'center' }}>{item.number}</h3>
											</Card.Text>
											<Row><Col md={{ span: 2 }}><BuyLottery /> </Col>
												<Col md={{ span: 3 }}><AddBasket /> </Col></Row>
										</Card.Body>
									</Card>
									
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
