import { GET_ALL_PRODUCT, GET_PRODUCT } from '../actions/ActionTypes';

export default (
	state = {
		productList: [],
		product: {}
	},
	action
) => {
	switch (action.type) {
		case GET_ALL_PRODUCT:
			return {
				...state,
				productList: action.data
			};
		case GET_PRODUCT:
			return {
				...state,
				product: action.data
			};
		default:
			return state;
	}
};
