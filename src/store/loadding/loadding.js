import { Dispatch } from "redux";

const TYPES = {
	loading: "loading",
};

const initialState = {
	loading: {
		isLoadding:true
	},
};

export const setLoading = (object) => async (dispatch: Dispatch) => {
	dispatch({
		type: TYPES.loading,
		loading: object,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.loading:
			return {
				...state,
				loading: action.loading,
			};
		default:
			return state;
	}
};

export default reducer;