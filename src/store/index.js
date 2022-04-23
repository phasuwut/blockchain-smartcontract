import { applyMiddleware, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "store/rootReducer";
import thunkMiddleware from "redux-thunk";

const bindMiddleware = (middleware: any) => {
	if (process.env.NODE_ENV !== "production") {
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

const store = createStore(rootReducer, bindMiddleware([thunkMiddleware]));

export default store;
