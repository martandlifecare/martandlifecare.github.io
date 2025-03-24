import React, { Component } from 'react';
import { Button } from 'primereact/button';
import whoWeAreImage from '../../assets/homeScreen/who-we-are.jpg';

export default class WhoWeAre extends Component {

    render() {

        const foundingYear = 1983;
        const currentYear = new Date().getFullYear();
        const yearsSinceFounding = currentYear - foundingYear;

        return (
            <div className='app-base-font-family mx-8 my-8 px-8'>
                <div className='font-medium text-6xl text-gray-700'>
                    Who We Are
                </div>
                <div className='flex gap-8 mt-6'>
                    <div className='flex flex-column gap-6'>
                        <div className='font-medium line-height-4 text-gray-600'>
                            In 1983, Martand entered in the life care segment has been on mission to provide affordable service to the people. At that time, people around the world were waking up to the benefits of herbal products for their personal care needs. So we decided to take it a step further, {yearsSinceFounding} YEARS precisely! <br />
                            Our company Martand Life Care came in existence in year 2008 and ever since we are striving for upcoming challenges, applications and requirements from markets. Our company takes utmost pride in providing them the best possible solution and service.
                        </div>
                        <div>
                            <Button label="Read More" className='app-background-linear border-round-3xl font-semibold p-button p-button-text p-component px-4 py-3 text-lg text-white-alpha-90 border-none' />
                        </div>
                    </div>
                    <div className=''>
                        <img alt='Who we are' className='h-18rem' src={whoWeAreImage} />
                    </div>
                </div>
            </div>
        );
    }
}