/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { Button, Col, Row } from 'react-bootstrap';
import * as ProductAction from '../../store/actions/ProductAction';

const ProductList = ({ productList, history, GetAllProduct, RemoveProduct, ...props }) => {
	const [filterString, SetFilterString] = useState('');
	const redirectToProduct = (id) => {
		history.push(`/product/${id}`);
	};
	const filterHandler = () => {
		const lwFilterStr = _.toLower(filterString);
		const filterList = _.filter(productList, (item) => {
			const lwName = _.toLower(item.name);
			const lwCategory = _.toLower(item.category);
			if (lwName === lwFilterStr || lwCategory === lwFilterStr || item.price === parseInt(lwFilterStr)) {
				return true;
			}
			return false;
		});
		return lwFilterStr.length > 0 ? filterList : productList;
	};

	const handleRemove = (productId) => {
		RemoveProduct(productId).then((res) => {
			if (res && res.data) {
				GetAllProduct();
			}
		});
	};
	useEffect(() => {
		GetAllProduct();
	}, []);

	return (
		<Row>

			<div className="product-list">
				<div className='products-page-header'>
					Products Manager App
			</div>
				<div className="products-manager-body"></div>

				<div className="product-filter">
					<div>Filter by Name / Category / Price</div>
					<input className="products-filter-input" type="text" onChange={(e) => SetFilterString(e.target.value)} value={filterString} />


				</div>
				<div className="product-add-button">
					<Button onClick={() => history.push('/addProduct')}>Add a Product</Button>
				</div>
				<div className="product-table-body"></div>

				<div className="product-table">
					<table class="table">
						<tr>
							<th>Product Id</th>
							<th>Product Name</th>
							<th>Product Price</th>
							<th>Product Category</th>
						</tr>
						{filterHandler() &&
							filterHandler().length > 0 &&
							_.map(filterHandler(), (item) => {
								return (
									<tr>
										<td>
											<a href="#" onClick={() => redirectToProduct(item.id)}>
												{item.id}
											</a>
										</td>
										<td>{item.name}</td>
										<td>{item.price}</td>
										<td>{item.category}</td>
										<td>
											<Icon type="close" onClick={() => handleRemove(item.id)} />
										</td>
									</tr>
								);
							})}
					</table>
				</div>
			</div>


		</Row>

	);
};

const mapStateToProps = (state) => ({
	productList: state.ProductReducer.productList
});

const mapDispatchToProps = (dispatch) => ({
	GetAllProduct: () => dispatch(ProductAction.GetAllProduct()),
	RemoveProduct: (productId) => dispatch(ProductAction.RemoveProduct(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList));
