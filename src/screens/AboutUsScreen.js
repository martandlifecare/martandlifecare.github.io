import React, { Component } from 'react';
import AboutUsHeader from '../components/aboutUsScreen/AboutUsHeader';
import GetInTouch from '../components/homeScreen/GetInTouch';
import AboutUsStrip from '../components/aboutUsScreen/AboutUsStrip';
import AboutMLC from '../components/aboutUsScreen/AboutMLC';

export default class AboutUsScreen extends Component {

  render() {

    return (
      <div className='app-base-font-family flex flex-column'>
        <AboutUsHeader />
        <AboutUsStrip />
        <AboutMLC />
        <GetInTouch />
      </div>
    );
  }
}