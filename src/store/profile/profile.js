import { Dispatch } from "redux";

const TYPES = {
	profile: "profile",
};

const initialState = {
	profile: {
		name: "",
		email: "",
	},
};

export const setProfile = (object) => async (dispatch: Dispatch) => {
	dispatch({
		type: TYPES.profile,
		profile: object,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.profile:
			return {
				...state,
				profile: action.profile,
			};
		default:
			return state;
	}
};

export default reducer;
