import React, { Component } from 'react';
import WhatWeOffer from '../components/homeScreen/WhatWeOffer';
import WhoWeAre from '../components/homeScreen/WhoWeAre';
import WhatWeHave from '../components/homeScreen/WhatWeHave';

export default class HomeScreen extends Component {

  render() {

    return (
      <div className=''>
        <WhatWeOffer />
        <WhoWeAre />
        <WhatWeHave />
      </div>
    );
  }
}