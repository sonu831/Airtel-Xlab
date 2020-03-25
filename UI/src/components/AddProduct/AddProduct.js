import React from 'react';
import { Formik, Form } from 'formik';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Select } from 'antd';
import * as ProductAction from '../../store/actions/ProductAction';
import { Button, Col, Row } from 'react-bootstrap';

const { Option } = Select;

const ProductCategory = {
	ELECTRONIC: 'ELECTRONIC',
	ELECTRICAL: 'ELECTRICAL',
	MECHANICAL: 'MECHANICAL'
};

const AddUser = ({ AddProduct, history, ...props }) => {
	return (
		<div className="product-form">
			<div className="product-details-header">
			<h1>Add Product</h1>


			</div>
			<div>
				<Button className="product-list-button btn-secondary" onClick={() => history.push('/')}>Back to Product List</Button>
			</div>
			<Formik
				enableReinitialize
				initialValues={{
					productName: '',
					price: '',
					category: ''
				}}
				validate={(values) => {
					const errors = {};
					if (!values.productName.length) {
						errors.productName = 'Product Name is Required';
					}
					if (!values.price.length) {
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
					AddProduct(obj).then((res) => {
						if (res && res.data) {
							history.push('/');
						}
					});
					resetForm();

					setSubmitting(true);
				}}
			>
				{({ values, isSubmitting, handleChange, setFieldValue, errors, touched, handleSubmit }) => {
					return (
						<Form>
							<div className="product-details-form">
								<Row>
									<Col>
										<label htmlFor="Product Name">Product Name</label>

									</Col>
									<Col>
										<input
											id="productName" product-details-header
											name="productName"
											type="text"
											onChange={handleChange}
											value={values.productName}
											className="product-details-input"

										/>
										{touched.productName && errors.productName ? (
											<div style={{ color: 'red' }}>{errors.productName}</div>
										) : null}
									</Col>



								</Row>

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
											onChange={handleChange}
											value={values.price}
											className="product-details-input"

										/>
										{touched.price && errors.price ? (
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
											id="category"
											showSearch
											className="product-details-input"
											style={{ width: 200 }}
											placeholder="Select a category"
											optionFilterProp="children"
											onChange={(e) => {
												setFieldValue('category', e);
											}}
										>
											<Option value={ProductCategory.ELECTRICAL}>{ProductCategory.ELECTRICAL}</Option>
											<Option value={ProductCategory.ELECTRONIC}>{ProductCategory.ELECTRONIC}</Option>
											<Option value={ProductCategory.MECHANICAL}>{ProductCategory.MECHANICAL}</Option>
										</Select>
										{errors.category ? <div style={{ color: 'red' }}>{errors.category}</div> : null}

									</Col>

								</Row>


								<br />
								<Row>

									<div className="product-list-submit-button">
										<Button  type="submit" onClick={handleSubmit} disabled={isSubmitting}>
											Add Product
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
	...state
});

const mapDispatchToProps = (dispatch) => ({
	AddProduct: (product) => dispatch(ProductAction.AddProduct(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddUser));
