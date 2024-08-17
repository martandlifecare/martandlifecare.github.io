import React, { Component } from 'react';
import ProductsCatalog from '../components/productsScreen/ProductsCatalog';

export default class ProductsScreen extends Component {

  render() {

    return (
      <div className='app-base-font-family mt-8 pt-4'>
        <ProductsCatalog />
      </div>
    );
  }
}