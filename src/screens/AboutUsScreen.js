import React, { Component } from 'react';
import AboutUsHeader from '../components/aboutUsScreen/AboutUsHeader';

export default class AboutUsScreen extends Component {

  render() {

    return (
      <div className='app-base-font-family flex flex-column'>
        <AboutUsHeader />
      </div>
    );
  }
}