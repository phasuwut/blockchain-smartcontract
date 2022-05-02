import { combineReducers } from "redux";
import etcReducer from "store/etc/etc";
import loadingReducer from "store/loadding/loadding";
import profileReducer from "store/profile/profile";
import walletReducer from "store/wallet/wallet";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	profile: profileReducer,
	etc: etcReducer,
	wallet: walletReducer,
	loading:loadingReducer 
});

export default rootReducer;
