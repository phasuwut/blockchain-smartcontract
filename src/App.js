import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Pages/Home/Home";
import Page404 from "./components/Pages/Page404/Page404";
import Search from "./components/Pages/Search/Search";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route>
					<Route index element={<Home />} />
					<Route path="search" element={<Search />} />
					<Route path="*" element={<Page404 />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
