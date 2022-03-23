import { BrowserRouter, Route, Routes } from "react-router-dom";

import HistoryPage from "./components/Pages/History/History";
import HomePage from "./components/Pages/Home/Home";
import Page404Page from "./components/Pages/Page404/Page404";
import SearchPage from "./components/Pages/Search/Search";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route>
					<Route index element={<HomePage />} />
					<Route path="search" element={<SearchPage />} />
					<Route path="history" element={<HistoryPage />} />
					<Route path="*" element={<Page404Page />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
