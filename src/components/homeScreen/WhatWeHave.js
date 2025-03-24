import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { whatWeOfferPoints } from '../../data/constants';
import backgroundImage from '../../assets/homeScreen/what-we-offer-bg.jpg';

export default class WhatWeHave extends Component {

    constructor(){
        super();
        this.state = {
            lifeCareProductsActive : true,
            pharmatechActive : false
        }
    }

    render() {

        const backgroundStyle = {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', // Adjust as needed (e.g., 'contain', 'auto')
            backgroundRepeat: 'no-repeat', // Adjust as needed (e.g., 'repeat', 'repeat-x', 'repeat-y')
            // You can add other background styles here, like backgroundPosition
        };

        const activeButtonClassName = "app-background-linear font-semibold px-4 py-3 text-lg text-white-alpha-90 border-none";
        const inactiveButtonClassName = "bg-white-alpha-30 font-semibold px-4 py-3 text-lg text-white-alpha-90 border-none";

        return (
            <div className='app-base-font-family px-8 py-8' style={backgroundStyle}>
                <div className='flex justify-content-center text-6xl text-white'>
                    What We Have
                </div>
                <div className='flex mt-8 mx-6 gap-4'>
                    <div className=''>
                        <Button label="Life Care Products" className={this.state.lifeCareProductsActive ? activeButtonClassName : inactiveButtonClassName } />
                    </div>
                    <div className=''>
                        <Button label="Pharmatech" className={this.state.pharmatechActive ? activeButtonClassName : inactiveButtonClassName } />
                    </div>
                </div>
                
            </div>
        );
    }
}