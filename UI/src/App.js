import React from 'react';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import configureStore from './store/configureStore';
import AddProduct from './components/AddProduct'
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
      <Switch>
        <Route default path="/addProduct" component={AddProduct} />
        <Route exact path="/" component={ProductList} />
        <Route path="/product/:productId" component={ProductDetail} />
      </Switch>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
