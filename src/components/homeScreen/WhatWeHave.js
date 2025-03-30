import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import backgroundImage from '../../assets/homeScreen/what-we-offer-bg.jpg';
import { lifeCareProductsWhatWeHaveDetails, pharmatechWhatWeHaveDetails } from '../../data/constants';

export default class WhatWeHave extends Component {

    constructor() {
        super();
        this.state = {
            lifeCareProductsActive: true,
            pharmatechActive: false
        }
    }

    render() {

        const backgroundStyle = {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        };

        const activeButtonClassName = "app-background-linear font-semibold md:px-4 md:py-3 text-base md:text-lg text-white-alpha-90 border-none";
        const inactiveButtonClassName = "bg-white-alpha-30 font-semibold md:px-4 md:py-3 text-base md:text-lg text-white-alpha-90 border-none";

        return (
            <div className='app-base-font-family md:px-8 px-2 md:py-8 py-4' style={backgroundStyle}>
                <div className='flex justify-content-center text-3xl md:text-6xl text-white'>
                    What We Have
                </div>
                <div className='flex gap-4 justify-content-center md:mt-8 md:mx-8 md:px-8 mt-6'>
                    <div className=''>
                        <Button label="Life Care Products" className={this.state.lifeCareProductsActive ? activeButtonClassName : inactiveButtonClassName}
                            onClick={(e) => {
                                this.setState({
                                    lifeCareProductsActive: true,
                                    pharmatechActive: false
                                })
                            }} />
                    </div>
                    <div className=''>
                        <Button label="Pharmatech" className={this.state.pharmatechActive ? activeButtonClassName : inactiveButtonClassName}
                            onClick={(e) => {
                                this.setState({
                                    lifeCareProductsActive: false,
                                    pharmatechActive: true
                                })
                            }} />
                    </div>
                </div>
                <div className='mt-6 md:mx-7 md:px-8 px-4'>
                    {
                        this.state.lifeCareProductsActive ?
                            <div className='flex flex-wrap gap-4 md:flex-row justify-content-between'>
                                {lifeCareProductsWhatWeHaveDetails.map(item => {
                                    return (
                                        <Fieldset
                                            legend={item.heading}
                                            className='bg-transparent border-2 border-round-3xl line-height-4 md:w-30rem w-full'
                                            key={item.heading}
                                        >
                                            <div className='flex align-items-center'>
                                                <div className='mr-3'>
                                                    <img
                                                        alt={item.heading}
                                                        src={`/assets/homeScreen/whatWeHaveImages/${item.imageName}`}
                                                    />
                                                </div>
                                                <div className='font-medium md:text-base text-sm text-white-alpha-80'>
                                                    {item.content}
                                                </div>
                                            </div>
                                        </Fieldset>
                                    )
                                })}
                            </div>
                            : null
                    }
                    {
                        this.state.pharmatechActive ?
                            <div className='flex flex-wrap gap-4 md:flex-row justify-content-between'>
                                {pharmatechWhatWeHaveDetails.map(item => {
                                    return (
                                        <Fieldset
                                            legend={item.heading}
                                            className='bg-transparent border-2 border-round-3xl line-height-4 md:w-30rem w-full'
                                            key={item.heading}
                                        >
                                            <div className='flex align-items-center'>
                                                <div className='mr-3'>
                                                    <img
                                                        alt={item.heading}
                                                        src={`/assets/homeScreen/whatWeHaveImages/${item.imageName}`}
                                                    />
                                                </div>
                                                <div className='font-medium md:text-base text-sm text-white-alpha-80'>
                                                    {item.content}
                                                </div>
                                            </div>
                                        </Fieldset>
                                    )
                                })}
                            </div>
                            : null
                    }
                </div>
            </div>
        );
    }
}