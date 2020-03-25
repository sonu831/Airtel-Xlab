import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Select } from 'antd';
import * as ProductAction from '../../store/actions/ProductAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row } from 'react-bootstrap';


const { Option } = Select;

const ProductCategory = {
	ELECTRONIC: 'ELECTRONIC',
	ELECTRICAL: 'ELECTRICAL',
	MECHANICAL: 'MECHANICAL'
};

const ProductDetail = ({ product, match, GetProduct, UpdateProduct, history, ...props }) => {
	const { productId } = match.params;
	useEffect(() => {
		if (productId) {
			GetProduct(productId);
		}
	}, []);

	return (
		<div className="user-form">
			<div className="product-details-header">
				<h1>Update Product</h1>

			</div>
			<div>
				<Button className="product-list-button btn-secondary" onClick={() => history.push('/')}>Back to Product List</Button>
			</div>
			<Formik
				enableReinitialize
				initialValues={{
					productName: product.length && product[0].name,
					price: product.length && product[0].price,
					category: product.length && product[0].category
				}}
				validate={(values) => {
					const errors = {};
					if (!values.productName.length) {
						errors.productName = 'Product Name is Required';
					}
					if (!values.price) {
						errors.price = 'Product price is Required';
					}
					if (!values.category.length) {
						errors.category = 'Product category is Required';
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(false);
					const obj = {
						name: values.productName,
						price: values.price,
						category: values.category
					};
					UpdateProduct(productId, obj).then((res) => {
						if (res && res.data) {
							history.push('/');
						}
					});
					resetForm();
				}}
			>
				{({ values, isSubmitting, handleChange, setFieldValue, handleSubmit, errors, touched }) => {
					return (
						<Form>
							<div className="product-details-form">
								<Row>
									<Col ><label htmlFor="Product Name">Product Name</label></Col>
									<Col><input
										id="productName"
										name="productName"
										type="text"
										onChange={handleChange}
										value={values.productName}
										className="product-details-input"
									/></Col>

								</Row>

								{errors.productName ? (
									<div style={{ color: 'red' }}>{errors.productName}</div>
								) : null}

								<br />
								<Row>
									<Col>
										<label htmlFor="Product Price">Product Price</label>

									</Col>
									<Col>
										<input
											id="price"
											name="price"
											type="text"
											className="product-details-input"

											onChange={handleChange}
											value={values.price}
										/>
										{errors.price ? (
											<div style={{ color: 'red' }}>{errors.price}</div>
										) : null}
									</Col>

								</Row>

								<br />
								<Row>
									<Col>


										<label>Product category</label>
									</Col>
									<Col>

										<Select
											name="category"
											showSearch
											style={{ width: 200 }}
											placeholder="Select a category"
											className="product-details-input"

											value={values.category}
											onChange={(e) => {
												setFieldValue('category', e);
											}}
										>
											<Option value={ProductCategory.ELECTRICAL}>{ProductCategory.ELECTRICAL}</Option>
											<Option value={ProductCategory.ELECTRONIC}>{ProductCategory.ELECTRONIC}</Option>
											<Option value={ProductCategory.MECHANICAL}>{ProductCategory.MECHANICAL}</Option>
										</Select>
										{errors.category ? <div style={{ color: 'red' }}>{errors.category}</div> : null}
										<br />
									</Col>
								</Row>
								<Row>

									<div className="product-list-submit-button">
										<Button type="submit" className="btn-success" onClick={handleSubmit} disabled={isSubmitting}>
											Update Product
								</Button>
									</div>



								</Row>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

const mapStateToProps = (state) => ({
	product: state.ProductReducer.product
});

const mapDispatchToProps = (dispatch) => ({
	UpdateProduct: (id, product) => dispatch(ProductAction.UpdateProduct(id, product)),
	GetProduct: (id) => dispatch(ProductAction.GetProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetail));
