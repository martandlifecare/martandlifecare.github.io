import React, { Component } from 'react';
import ProductsCatalogScreen from '../components/productsScreen/ProductsCatalogScreen';

export default class ProductsScreen extends Component {

  render() {

    return (
      <div className='app-base-font-family mt-8 pt-4'>
        <ProductsCatalogScreen />
      </div>
    );
  }
}