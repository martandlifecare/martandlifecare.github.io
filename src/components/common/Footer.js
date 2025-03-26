import React, { Component } from 'react';
import logo from '../../assets/logo.webp';
import backgroundImage from '../../assets/footer-bg.png';
import { contactDetaisFooter } from '../../data/constants';

export default class Footer extends Component {

    render() {

        const backgroundStyle = {
            backgroundImage: `url(${backgroundImage})`,
            //backgroundSize: 'cover', // Adjust as needed (e.g., 'contain', 'auto')
            backgroundRepeat: 'no-repeat', // Adjust as needed (e.g., 'repeat', 'repeat-x', 'repeat-y')
        };

        return (
            <div className='align-items-center app-base-font-family p-4 md:px-8 md:py-8 bg-center md:bg-cover' style={backgroundStyle}>
                <div className='flex md:mx-8 md:px-8 md:flex-row flex-column'>
                    <div className='flex flex-1 flex-column md:gap-6 gap-3'>
                        <div className=''>
                            <img alt='Logo' className='cursor-pointer h-4rem md:h-5rem' src={logo} />
                        </div>
                        <div className='font-medium line-height-4 pl-3 md:pr-8 text-gray-500 text-sm'>
                            MARTAND LIFE CARE PVT. LTD. has been developing and implementing innovative solutions to the industries since its foundation, we deal in multiple sectors of pharma as well as nutraceuticals industries like CMO/QMS/TURNKEY PROJECT/HRM.
                        </div>
                        <div className='pl-3 text-gray-500 font-medium text-sm'>
                            Copyright © {new Date().getFullYear()} All rights reserved
                        </div>
                    </div>
                    <div className='border-3 border-bluegray-100 border-round-3xl flex flex-1 flex-column p-3 md:p-6 my-4 md:my-0'>
                        <div className='border-blue-200 border-bottom-3 text-xl md:text-3xl text-600 w-fit mb-2'>Contact Us</div>
                        <div className='flex flex-column gap-4 mt-5'>
                            {
                                contactDetaisFooter.map((item,index) => {
                                    return (<div className='flex' key={index}>
                                        <div className='font-semibold text-gray-600 w-4rem mr-4 md:text-base text-sm'>{item.name}</div>
                                        <div className='font-medium line-height-3 text-gray-500 md:text-sm text-xs'>{item.value}</div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}