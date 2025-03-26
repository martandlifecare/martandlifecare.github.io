import 'swiper/css';
import 'swiper/css/pagination';
import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { homeScreenBannerDetails } from '../../data/constants';
import routeConstants from '../../navigation/RouteConstants.json';

// Custom HOC to provide navigate prop
const withNavigate = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
};

class Banner extends Component {
    handleReadMoreClick = () => {
        this.props.navigate(routeConstants.productsScreenPath);
        window.scrollTo(0, 0);
    };

    render() {
        return (
            <div className='align-items-center app-base-font-family'>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,

                    }}
                    pagination={{
                        clickable: true,
                    }}
                >
                    {homeScreenBannerDetails.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div
                                style={{
                                    backgroundImage: `url('assets/homeScreen/bannerImages/${slide.imageName}')`,
                                    backgroundSize: 'cover',
                                    // backgroundPosition: 'center',
                                }}
                                className='md:p-8 md:h-screen h-30rem md:bg-center'
                            >
                                <div className='flex flex-column md:gap-6 gap-5 p-4 pt-8 md:p-8 md:w-6'>
                                    <div className='font-medium text-3xl md:text-7xl text-gray-700 mt-8'>
                                        {slide.heading}
                                    </div>
                                    <div className='font-medium line-height-4 text-gray-700 text-base md:text-lg'>
                                        {slide.content}
                                    </div>
                                    <div className=''>
                                        <Button
                                            label="Read More"
                                            className='app-background-linear border-none border-round-3xl font-semibold md:line-height-3 md:px-6 md:py-2 text-white-alpha-90'
                                            icon="pi pi-arrow-right"
                                            iconPos='right'
                                            onClick={this.handleReadMoreClick}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    }
}

export default withNavigate(Banner); // Wrap with the custom HOC