import 'swiper/css';
import 'swiper/css/pagination';
import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { homeScreenBannerDetails } from '../../data/constants';
import routeConstants from '../../navigation/RouteConstants.json';
import { useNavigate } from 'react-router-dom';

// Custom HOC to provide navigate prop
const withNavigate = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
};

class Banner extends Component {
    handleReadMoreClick = () => {
        this.props.navigate(routeConstants.productsScreenPath);
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
                                    backgroundPosition: 'center',
                                }}
                                className='p-8 h-screen'
                            >
                                <div className='flex flex-column gap-6 p-8 w-6 mt-8'>
                                    <div className='font-medium text-7xl text-gray-700'>
                                        {slide.heading}
                                    </div>
                                    <div className='font-medium line-height-4 text-gray-700 text-lg'>
                                        {slide.content}
                                    </div>
                                    <div className=''>
                                        <Button
                                            label="Read More"
                                            className='app-background-linear border-none border-round-3xl font-semibold line-height-3 px-6 py-2 text-white-alpha-90'
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