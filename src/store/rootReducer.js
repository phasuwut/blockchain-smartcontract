import { combineReducers } from "redux";
import profileReducer from "./profile/profile";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	profile: profileReducer,
});

export default rootReducer;
