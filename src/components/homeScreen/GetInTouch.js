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
        const subject = `Query from website - ${new Date().toLocaleDateString('en-GB').split('/').join('-')}`; // Format as DD-MM-YYYY
        const query = this.state.query;
        const body = encodeURIComponent(`Hi,\n\nBelow is a query submitted, please have a look:\n\n${query}`); // Modified body

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;

        // Programmatically create and click an invisible link
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
                    <InputText value={this.state.query} onChange={(e) => this.setState({ query: e.target.value })} className='w-30rem text-xs' 
                        placeholder='Write your query and please mention your email/contact number.'/>
                </div>
                <div className=''>
                    <Button label="Submit" className='app-background-linear border-round-3xl font-semibold px-8 py-3 text-base text-white-alpha-90 border-none'
                        onClick={(e) => this.sendEmail()} />
                </div>
            </div>
        );
    }
}