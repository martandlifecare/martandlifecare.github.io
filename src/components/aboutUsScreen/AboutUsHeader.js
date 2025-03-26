import React, { Component } from 'react';

export default class AboutUsHeader extends Component {
    render() {
        return (
            <div
                className='app-base-font-family px-8 md:bg-center about-us-header'
                style={{
                    backgroundImage: `url('assets/homeScreen/bannerImages/martandlife-12.jpg')`,
                    backgroundSize: 'cover'
                }}>
                <div className='flex flex-column gap-2 md:p-8 md:w-6 mt-8 align-items-center md:align-items-start'>
                    <div className='font-medium text-3xl md:text-7xl text-gray-700 mt-6'>
                        About us
                    </div>
                    <div className='font-medium line-height-4 pl-1 text-gray-500'>
                        Home / <span className='text-blue-400'>About Us</span>
                    </div>
                </div>
            </div>
        );
    }
}
