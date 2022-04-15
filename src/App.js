import { BrowserRouter, Route, Routes } from "react-router-dom";

import BackOffice from "./components/Pages/BackOffice/BackOffice";
import Check from "./components/Pages/Check/Check";
import ContactUs  from "./components/Pages/ContactUs/ContactUs";
import HistoryPage from "./components/Pages/History/History";
import HomePage from "./components/Pages/Home/Home";
import Page404Page from "./components/Pages/Page404/Page404";
import SearchPage from "./components/Pages/Search/Search";
import SmartContractTest1 from "./components/Pages/SmartContract/Test-1/Test1";
import MyDetail from "./components/Pages/MyDetail/MyDetail"
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route>
					<Route index element={<HomePage />} />
					<Route path="search" element={<SearchPage />} />
					<Route path="history" element={<HistoryPage />} />
					<Route path="smart-contract/test1" element={<SmartContractTest1 />} />
					<Route path="contact-us" element={<ContactUs  />} />
					<Route path="check" element={<Check />} />
					<Route path="back-office" element={<BackOffice />} />
					<Route path="my-detail" element={<MyDetail/>} />
					<Route path="*" element={<Page404Page />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
