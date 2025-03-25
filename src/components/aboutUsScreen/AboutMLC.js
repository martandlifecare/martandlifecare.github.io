import React, { Component } from 'react';
import aboutUsImage from '../../assets/aboutUsScreen/about-us.jpg';
import missionImage from '../../assets/aboutUsScreen/mission.png';
import visionImage from '../../assets/aboutUsScreen/vision.jpg';

export default class AboutMLC extends Component {
    render() {
        return (
            <div className='app-base-font-family mx-7 p-8'>

                <div className='align-items-center flex md:gap-8 gap-4'>
                    <div className=''>
                        <div className='font-medium text-3xl md:text-6xl text-gray-700'>About MLC</div>
                        <div className='font-medium line-height-4 text-gray-600'>
                            <p>
                                Martand Life Care is India’s one of the latest and fastest-growing
                                companies. We are committed to working collaboratively with our
                                customers. We are committed to providing high-quality medicines at an
                                affordable price to our customers aiming to reduce health care costs
                                as well we deliver within the stipulated time.
                            </p>
                            <p>
                                We, at Martand Life Care, are ethically oriented and giving our best to
                                the societies and country as well. Our company focuses on maintaining
                                social responsibilities, the important values of the industry, and
                                offering complete support regarding the pharma industry to the people.
                            </p>
                            <p>
                                We have a stronghold in all the major cities of the nation as we
                                believe in extending our motto all over the country for a healthy
                                lifestyle. We are established as a contract manufacturing
                                organization in India and are successfully spreading all over the
                                nation, being ranked under top Pharma names in such a short period.
                            </p>
                        </div>
                    </div>
                    <div className=''>
                        <img src={aboutUsImage} alt="About us" className='h-30rem' />
                    </div>
                </div>

                <div className='align-items-center flex md:gap-8 gap-4'>
                    <div className=''>
                        <img src={missionImage} alt="Mission" className='h-30rem' />
                    </div>
                    <div className=''>
                        <div className='font-medium text-3xl md:text-6xl text-gray-700'>Mission</div>
                        <div className='font-medium line-height-4 text-gray-600'>
                            <p>
                                Our mission is to improve the quality of life of our people. We will
                                be one strong team united by our mission and values in our restless
                                pursuit to be the regional partner of choice in health and personal
                                care solutions. Our seamless solution ensures that our products are in
                                the right place at the right time.
                            </p>
                            <p>
                                We, at Martand Life Care, have been developing and implementing
                                innovative products and solutions to the industries since its
                                foundation.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='align-items-center flex md:gap-8 gap-4'>
                    <div className=''>
                        <div className='font-medium text-3xl md:text-6xl text-gray-700'>Vision</div>
                        <div className='font-medium line-height-4 text-gray-600'>
                            <p>
                                Martand has been working for the life care segment for the past 3
                                decades but has risen to a wider scope with today’s vision. The company
                                stands as one of the leading Contract Manufacturing Organization firms
                                in the field of the medicinal product and technical services of
                                pharmaceutical industries and provides quality products at a very
                                reasonable price so that the consumers can purchase them at a low
                                price. In this way, we serve society and hence the country as well.
                            </p>
                        </div>
                    </div>
                    <div className=''>
                        <img src={visionImage} alt="Vision" className='h-30rem' />
                    </div>
                </div>

            </div>
        );
    }
}