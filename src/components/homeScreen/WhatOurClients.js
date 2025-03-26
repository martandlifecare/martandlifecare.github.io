import React, { Component } from 'react';
import { Carousel } from 'primereact/carousel';
import { clientFeedbacks } from '../../data/constants';

export default class WhatOurClients extends Component {

    clientFeedbackTemplate = (item) => {
        return (
            <div className='md:px-4 px-2 text-sm md:text-lg text-gray-800 line-height-3'>
                {item}
            </div>
        )
    }

    render() {

        return (
            <div className='app-base-font-family md:mx-8 md:px-8 md:py-8 mx-5 py-6'>
                <div className='justify-content-center font-medium text-3xl md:text-6xl text-gray-700'>
                    What our clients say
                </div>
                <div className='md:mt-8 mt-6'>
                    <Carousel value={clientFeedbacks} numVisible={1} numScroll={1}
                        circular
                        autoplayInterval={3000}
                        itemTemplate={this.clientFeedbackTemplate}
                    />
                </div>
            </div>
        );
    }
}