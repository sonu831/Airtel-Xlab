import axios from 'axios';

let config = {
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
};

export const postProduct = (product) => axios.post(`http://localhost:3000/products/create`, product);

export const getAllProducts = () => axios.get(`http://localhost:3000/products/all/`);

export const getProduct = (productId) => axios.get(`http://localhost:3000/products/${productId}`);

export const updateProduct = (productId, product) =>
	axios.put(`http://localhost:3000/products/${productId}/update`, product);

export const removeProduct = (productId) => axios.delete(`http://localhost:3000/products/${productId}/delete`);
