import React, { Component } from 'react';
import WhatWeOffer from '../components/homeScreen/WhatWeOffer';
import WhoWeAre from '../components/homeScreen/WhoWeAre';
import WhatWeHave from '../components/homeScreen/WhatWeHave';
import WhatOurClients from '../components/homeScreen/WhatOurClients';
import GetInTouch from '../components/homeScreen/GetInTouch';
import Banner from '../components/homeScreen/Banner';

export default class HomeScreen extends Component {

  render() {

    return (
      <div className=''>
        <Banner />
        <WhatWeOffer />
        <WhoWeAre />
        <WhatWeHave />
        <WhatOurClients />
        <GetInTouch />
      </div>
    );
  }
}