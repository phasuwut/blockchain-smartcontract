import { BrowserRouter, Route, Routes } from "react-router-dom";

import HistoryPage from "./components/Pages/History/History";
import HomePage from "./components/Pages/Home/Home";
import LotteryHome from "./components/Pages/SmartContract/Lottery/Pages/Home/Home";
import Page404Page from "./components/Pages/Page404/Page404";
import SearchPage from "./components/Pages/Search/Search";
import SmartContractTest1 from "./components/Pages/SmartContract/Test-1/Test1";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route>
					<Route index element={<HomePage />} />
					<Route path="search" element={<SearchPage />} />
					<Route path="history" element={<HistoryPage />} />
					<Route path="smart-contract/test1" element={<SmartContractTest1 />} />
					<Route path="lottery" element={<LotteryHome />} />
					<Route path="*" element={<Page404Page />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
