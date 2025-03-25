import React, { Component } from 'react';

export default class AboutUsHeader extends Component {
    render() {
        return (
            <div
                className='app-base-font-family px-8'
                style={{
                    backgroundImage: `url('assets/homeScreen/bannerImages/martandlife-12.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '65vh'
                }}>
                <div className='flex flex-column gap-2 p-8 w-6 mt-8'>
                    <div className='font-medium text-7xl text-gray-700 md:mt-6 mt-3'>
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
