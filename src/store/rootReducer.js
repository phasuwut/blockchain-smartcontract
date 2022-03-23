import { combineReducers } from "redux";
import etcReducer from "./etc/etc";
import profileReducer from "./profile/profile";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	profile: profileReducer,
	etc: etcReducer,
});

export default rootReducer;
