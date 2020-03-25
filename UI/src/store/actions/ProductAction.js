import * as API from '../../api/ProductAPI';
import { CREATE_PRODUCT, GET_ALL_PRODUCT, GET_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT } from './ActionTypes';

export const AddProduct = (product) => (dispatch) =>
	API.postProduct(product).then((res) => dispatch({ type: CREATE_PRODUCT, data: res.data })).catch((error) => {
		throw error;
	});

export const GetAllProduct = () => (dispatch) =>
	API.getAllProducts().then((res) => dispatch({ type: GET_ALL_PRODUCT, data: res.data })).catch((error) => {
		throw error;
	});

export const GetProduct = (id) => (dispatch) =>
	API.getProduct(id).then((res) => dispatch({ type: GET_PRODUCT, data: res.data })).catch((error) => {
		throw error;
	});

export const UpdateProduct = (id, product) => (dispatch) =>
	API.updateProduct(id, product).then((res) => dispatch({ type: UPDATE_PRODUCT, data: res.data })).catch((error) => {
		throw error;
	});

export const RemoveProduct = (id) => (dispatch) =>
	API.removeProduct(id).then((res) => dispatch({ type: REMOVE_PRODUCT, data: res.data })).catch((error) => {
		throw error;
	});
