import { Dispatch } from "redux";

const TYPES = {
	wallet: "wallet",
};

const initialState = {
	wallet: {
		walletAddress: "",
		money: "",
	},
};

export const setWallet = (object) => async (dispatch: Dispatch) => {
	dispatch({
		type: TYPES.wallet,
		wallet: object,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.wallet:
			return {
				...state,
				wallet: action.wallet,
			};
		default:
			return state;
	}
};

export default reducer;
