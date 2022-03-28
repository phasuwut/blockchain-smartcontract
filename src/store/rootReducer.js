import { combineReducers } from "redux";
import etcReducer from "./etc/etc";
import profileReducer from "./profile/profile";
import walletReducer from "./wallet/wallet";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	profile: profileReducer,
	etc: etcReducer,
	wallet: walletReducer,
});

export default rootReducer;
