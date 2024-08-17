import React, { Component } from 'react';
import backgroundImageBanner from '../../assets/aboutUsScreen/banner.png';

export default class AboutUsHeader extends Component {
    render() {
        return (
            <div 
                className='app-base-font-family' 
                style={{
                    backgroundImage: `url(${backgroundImageBanner})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    height: '100vh',  // Set height if needed
                    width: '100%',  // Set width if needed
                }}
            >
                {/* Content goes here */}
            </div>
        );
    }
}
