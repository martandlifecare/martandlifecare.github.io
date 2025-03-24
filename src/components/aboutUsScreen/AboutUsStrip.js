import React, { Component } from 'react';
import { aboutUsStripDetails } from '../../data/constants';

export default class AboutUsStrip extends Component {
    render() {
        return (
            <div className='app-base-font-family'>
                <div class="flex flex-wrap">
                    {aboutUsStripDetails.map((card, index) => (
                        <div
                            key={index} // Use index as key for simplicity in this example
                            className="surface-border about-us-card-deck-gradient flex-grow-1"
                        >
                            <div className="p-3 text-center">
                                <div className="mb-2">
                                    <img
                                        src={`assets/aboutUsScreen/aboutUsStrip/${card.imageName}`}
                                        alt={card.name}
                                        className='h-4rem'
                                    />
                                </div>
                                <div className="font-medium text-white">{card.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
