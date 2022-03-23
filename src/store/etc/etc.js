import { Dispatch } from "redux";

const TYPES = {
	etc: "etc",
};

const initialState = {
	etc: {
		a: "",
		b: "",
		c: [],
	},
};

export const setProfile = (object) => async (dispatch: Dispatch) => {
	dispatch({
		type: TYPES.etc,
		etc: object,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.etc:
			return {
				...state,
				etc: action.etc,
			};
		default:
			return state;
	}
};

export default reducer;
