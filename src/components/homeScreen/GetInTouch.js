import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import backgroundImage from '../../assets/homeScreen/reach-us.jpg';

export default class GetInTouch extends Component {

    constructor() {
        super();
        this.state = {
            emailAddress: ''
        }
    }

    render() {

        const backgroundStyle = {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', // Adjust as needed (e.g., 'contain', 'auto')
            backgroundRepeat: 'no-repeat', // Adjust as needed (e.g., 'repeat', 'repeat-x', 'repeat-y')
            // You can add other background styles here, like backgroundPosition
        };

        return (
            <div className='align-items-center app-base-font-family flex flex-column gap-5 px-8 py-5' style={backgroundStyle}>
                <div className='flex justify-content-center text-5xl text-white'>
                    Get in touch with us
                </div>
                <div className=''>
                    <InputText value={this.state.emailAddress} onChange={(e) => this.setState({ emailAddress: e.target.value })} className='w-21rem text-xs' 
                        placeholder='Enter your email and we will get back to you'/>
                </div>
                <div className=''>
                    <Button label="Submit" className='app-background-linear border-round-3xl font-semibold px-8 py-3 text-base text-white-alpha-90 border-none'
                         />
                </div>
            </div>
        );
    }
}