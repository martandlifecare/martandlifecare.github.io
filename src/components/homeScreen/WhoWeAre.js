import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import routeConstants from '../../navigation/RouteConstants.json';
import whoWeAreImage from '../../assets/homeScreen/who-we-are.jpg';

const withNavigate = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
};

class WhoWeAre extends Component {
    handleReadMoreClick = () => {
        this.props.navigate(routeConstants.aboutUsScreenPath);
        window.scrollTo(0, 0);
    };

    render() {
        const foundingYear = 1983;
        const currentYear = new Date().getFullYear();
        const yearsSinceFounding = currentYear - foundingYear;

        return (
            <div className='app-base-font-family md:mx-8 md:my-8 md:px-8 my-4 px-4'>
                <div className='font-medium text-3xl md:text-6xl text-gray-700'>
                    Who We Are
                </div>
                <div className='flex md:gap-8 gap-4 md:mt-6 mt-3 md:flex-row flex-column'>
                    <div className='flex flex-column md:gap-6 gap-3'>
                        <div className='font-medium line-height-4 text-gray-600 md:text-base text-sm'>
                            In 1983, Martand entered in the life care segment has been on mission to provide affordable service to the people. At that time, people around the world were waking up to the benefits of herbal products for their personal care needs. So we decided to take it a step further, {yearsSinceFounding} YEARS precisely! <br />
                            Our company Martand Life Care came in existence in year 2008 and ever since we are striving for upcoming challenges, applications and requirements from markets. Our company takes utmost pride in providing them the best possible solution and service.
                        </div>
                        <div>
                            <Button
                                label="Read More"
                                className='app-background-linear border-none border-round-3xl font-semibold line-height-3 px-6 py-2 text-white-alpha-90'
                                icon="pi pi-arrow-right"
                                iconPos='right'
                                onClick={this.handleReadMoreClick}
                            />
                        </div>
                    </div>
                    <div className=''>
                        <img alt='Who we are' className='md:h-18rem md:w-fit w-full' src={whoWeAreImage} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigate(WhoWeAre);