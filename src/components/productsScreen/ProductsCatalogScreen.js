import React, { Component } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import productsCatalog from '../../data/productsCatalog.json';
import allopathic from '../../assets/productsScreen/allopathic.jpg';
import herbal from '../../assets/productsScreen/herbal.png';

export default class ProductsCatalogScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
        this.imageIndexMap = {
            0 : allopathic,
            1 : herbal
        }
    }

    // Method to generate tab items with custom header templates
    getTabItems = () => {
        return Object.keys(productsCatalog).map((tab, index) => ({
            label: tab.charAt(0).toUpperCase() + tab.slice(1),
            template: (item, options) => this.renderTabTemplate(item, options, index),
            command: () => this.setState({ activeIndex: index })
        }));
    };

    // Method to render tab header template
    renderTabTemplate = (item, options, index) => (
        <div className="align-items-center flex flex-column gap-4 p-4" onClick={options.onClick} style={{ cursor: 'pointer' }}>
            <img 
                alt={item.label} 
                src={this.imageIndexMap[index]}  
                className='h-8rem w-8rem app-products-header-image'
            />
            <span className='font-medium text-800 text-lg'>{item.label}</span>
        </div>
    );

    // Method to render tab content
    renderTabContent = () => {
        const { activeIndex } = this.state;
        const tabs = Object.keys(productsCatalog);
        const category = tabs[activeIndex];
        return productsCatalog[category].map((item, index) => (
            <Card key={index} className="border-round-2xl p-card p-component shadow-2 w-16rem">
                <div className='flex flex-column gap-4'>
                    <div className='flex justify-content-end'>
                        <Tag severity="success" value={item.pack}></Tag>
                    </div>
                    <div className='flex flex-column gap-4'>
                        <div className='h-9rem bg-gray-800 border-round-2xl'
                            style={{ backgroundImage: `url(${process.env.PUBLIC_URL + 'productImages/' + item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    </div>
                    <div className='flex flex-column gap-2 text-center'>
                        <div className='text-2xl text-800 font-semibold'>{item.name}</div>
                        <div className='text-500 font-semibold'>{item.composition}</div>
                        <div className='flex flex-column gap-2 mt-4 text-600'>
                            <div className='align-self-center border-1 border-300 border-round-2xl px-3 py-1'><i className="mr-1 pi pi-tag text-xs"></i> {item.category.dosage}</div>
                            <div className='align-self-center border-1 border-300 border-round-2xl px-3 py-1'><i className="mr-1 pi pi-tag text-xs"></i> {item.category.therpatic}</div>
                        </div>
                    </div>
                </div>
            </Card>
        ));
    };

    render() {
        return (
            <div className='px-8 app-base-font-family mx-3'>
                <div className='flex flex-column gap-6'>
                    <div className='flex flex-column gap-4 mt-4'>
                        <div className='border-bottom-3 border-green-500 border-none pb-2 text-5xl text-800 w-fit'>Our Products</div>
                        <div className='text-800 text-xl'>Our company is offering the wide range of the pharma products with the best quality.</div>
                    </div>
                    <TabMenu
                        model={this.getTabItems()}
                        activeIndex={this.state.activeIndex}
                        onTabChange={(e) => this.setState({ activeIndex: e.index })}
                        className='align-self-center px-8'
                    />
                    <div className="flex gap-4 mt-4">
                        {this.renderTabContent()}
                    </div>
                </div>
            </div>
        );
    }
}
