import React, { Component } from 'react';
import ProductsCatalog from '../components/productsScreen/ProductsCatalog';
import ProductsHeader from '../components/productsScreen/ProductsHeader';
import GetInTouch from '../components/homeScreen/GetInTouch';

export default class ProductsScreen extends Component {

  render() {

    return (
      <div className='app-base-font-family flex flex-column'>
        <ProductsHeader />
        <ProductsCatalog />
        <GetInTouch />
      </div>
    );
  }
}