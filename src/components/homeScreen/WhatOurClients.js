import React, { Component } from 'react';
import { Carousel } from 'primereact/carousel';
import { clientFeedbacks } from '../../data/constants';

export default class WhatOurClients extends Component {

    clientFeedbackTemplate = (item) => {
        return (
            <div className='px-4 py- text-lg text-gray-800 line-height-3'>
                {item}
            </div>
        )
    }

    render() {

        return (
            <div className='app-base-font-family px-8 py-8 mx-8'>
                <div className='justify-content-center font-medium text-6xl text-gray-700'>
                    What our clients say
                </div>
                <div className='mt-8'>
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