import React, { useState } from "react";

import Select from "react-select";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const MyLottery = ({ myListLottery, myPeriod }) => {
	const [selectPreiod, setSelectPreiod] = useState("");
	const [select, setSelect] = useState(0);

	return (
		<Wapper className="flex justify-center">
			<br />
			<div className="w-full">
				<div className="flex justify-between ">
					<p>{`งวด ${selectPreiod}`}</p>
					<Select
						options={myPeriod}
						defaultValue={myPeriod[myPeriod.length - 1]}
						onChange={(values) => {
							setSelectPreiod(values.value);
							setSelect(myPeriod.findIndex((item) => item.value === values.value));
						}}
					/>
				</div>
				<br />
				<CustomTable bordered hover responsive striped className="text-center">
					<thead>
						<tr>
							<th>#</th>
							<th>Number</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
						{myListLottery[select].listNeuber.map((item2, j) => {
							return (
								<tr key={j}>
									<td>{j + 1}</td>
									<td>{item2.number}</td>

									<td>{item2.address}</td>
								</tr>
							);
						})}
					</tbody>
				</CustomTable>
			</div>
		</Wapper>
	);
};

const Wapper = styled.div``;

const CustomTable = styled(Table)`
	background-color: snow;
`;
export default MyLottery;
