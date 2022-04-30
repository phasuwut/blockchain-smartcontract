import { BrowserRouter, Route, Routes } from "react-router-dom";

import Award from "components/Pages/Award/Award"
import BackOffice from "components/Pages/BackOffice/BackOffice";
import Check from "components/Pages/Check/Check";
import ContactUs  from "components/Pages/ContactUs/ContactUs";
import DetailEtc from "components/Pages/DetailEtc/DetailEtc"
import HistoryPage from "components/Pages/History/History";
import HomePage from "components/Pages/Home/Home";
import Login from "./components/Pages/Login/login";
import MyDetail from "components/Pages/MyDetail/MyDetail"
import Page404Page from "components/Pages/Page404/Page404";
import Register from "./components/Pages/Register/Register";
import SearchPage from "components/Pages/Search/Search";
import SmartContractTest1 from "components/Pages/SmartContract/Test-1/Test1";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route>
					<Route index element={<HomePage />} />
					<Route path="search" element={<SearchPage />} />
					<Route path="home" element={<HomePage />} />
					{/* <Route path="history" element={<HistoryPage />} /> */}
					<Route path="smart-contract/test1" element={<SmartContractTest1 />} />
					{/* <Route path="contact-us" element={<ContactUs  />} /> */}
					<Route path="check" element={<Check />} />
					<Route path="back-office" element={<BackOffice />} />
					<Route path="my-detail" element={<MyDetail/>} />
					<Route path="detail-all" element={<DetailEtc />} />
					<Route path="*" element={<Page404Page />} />
					<Route path="register" element={<Register />} />

				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
