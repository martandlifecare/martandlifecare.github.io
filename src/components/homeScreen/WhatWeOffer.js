import React, { Component } from 'react';
import { whatWeOfferPoints } from '../../data/constants';
import backgroundImage from '../../assets/homeScreen/what-we-offer-bg.jpg';

export default class WhatWeOffer extends Component {

    render() {

        const backgroundStyle = {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', // Adjust as needed (e.g., 'contain', 'auto')
            backgroundRepeat: 'no-repeat', // Adjust as needed (e.g., 'repeat', 'repeat-x', 'repeat-y')
            // You can add other background styles here, like backgroundPosition
        };

        return (
            <div className='app-base-font-family px-8 py-8' style={backgroundStyle}>
                <div className='flex justify-content-center text-6xl text-white'>
                    What We Offer
                </div>
                <div className='flex flex-wrap gap-4 justify-content-around mt-6 mx-8'>
                    {
                        whatWeOfferPoints.map((item,index) => {
                            return (
                                <div className='app-background-linear font-semibold px-5 py-3 text-lg text-white'
                                    style={{minWidth : "24rem"}}
                                    key={index}>
                                    {item}
                                </div>)
                        })
                    }
                </div>
            </div>
        );
    }
}