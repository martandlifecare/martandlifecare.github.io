import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import backgroundImage from '../../assets/reach-us.jpg';

export default class GetInTouch extends Component {

    constructor() {
        super();
        this.state = {
            query: ''
        }
    }

    sendEmail = () => {
        const recipient = 'martandlifecare@gmail.com';
        const subject = `Query from website - ${new Date().toLocaleDateString('en-GB').split('/').join('-')}`;
        const query = this.state.query;
        const body = encodeURIComponent(`Hi,\n\nBelow is a query submitted, please have a look:\n\n${query}`);

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;

        const tempLink = document.createElement('a');
        tempLink.href = mailtoLink;
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);

        this.setState({query: ''})
    }

    render() {

        const backgroundStyle = {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        };

        return (
            <div className='align-items-center app-base-font-family flex flex-column gap-3 md:gap-5 md:px-8 py-3 md:py-5' style={backgroundStyle}>
                <div className='flex justify-content-center text-3xl md:text-5xl text-white'>
                    Get in touch with us
                </div>
                <div className=''>
                    <InputText value={this.state.query} onChange={(e) => this.setState({ query: e.target.value })} className='md:w-30rem w-22rem text-xs' 
                        placeholder='Write your query and please mention your email/contact number.'/>
                </div>
                <div className=''>
                    <Button label="Submit" className='app-background-linear border-round-3xl font-semibold px-4 md:px-8 md:py-3 text-sm md:text-base text-white-alpha-90 border-none'
                        onClick={(e) => this.sendEmail()} />
                </div>
            </div>
        );
    }
}