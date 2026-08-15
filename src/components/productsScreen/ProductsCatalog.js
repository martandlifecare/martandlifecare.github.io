import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import { TieredMenu } from 'primereact/tieredmenu';
import React, { Component, createRef } from 'react';
import productsCatalog from '../../data/productsCatalog.json';

export default class ProductsCatalog extends Component {
    constructor(props) {
        super(props);
        this.menu = createRef(); // Creating a reference for the TieredMenu component
        this.state = {
            activeIndex: 0,
            filterCategories: [],
            filterMenuItems: [],
            filteredItems: []
        };
    }

    componentDidMount = () => {
        this.getFilterMenuItems(this.state.activeIndex);
        this.filterItems(this.state.filterCategories, this.state.activeIndex);
    }

    // Method to generate tab items with custom header templates
    getTabItems = () => {
        return Object.keys(productsCatalog).map((tab, index) => ({
            label: tab.charAt(0).toUpperCase() + tab.slice(1),
            template: (item, options) => this.renderTabTemplate(item, options, index, tab),
            command: () => {
                this.setState({ activeIndex: index, filterCategories: [] })
                this.getFilterMenuItems(index);
                this.filterItems([], index);
            }
        }));
    };

    // Method to render tab header template
    renderTabTemplate = (item, options, index, tab) => {
        const categoryImage = productsCatalog[tab]?.image || ''; // Get the image path from productsCatalog
        const imagePath = `${process.env.PUBLIC_URL}/assets/productsScreen/productCategoryImages/${categoryImage}`;

        return (
            <div className="align-items-center flex flex-column gap-4 p-4 " onClick={options.onClick} style={{ cursor: 'pointer' }} key={index}>
                <img
                    alt={item.label}
                    src={imagePath}
                    className={`h-5rem md:h-8rem app-products-header-image transition-all transition-duration-300 ${this.state.activeIndex === index ? 'app-products-header-image-active' : ''}`}
                />
                <span className={`font-medium text-800 md:text-lg transition-all transition-duration-300 pb-2 ${this.state.activeIndex === index ? 'border-bottom-3 border-green-500' : ''}`}>{item.label}</span>
            </div>
        );
    };

    getFilterMenuItems = (activeIndex) => {
        const tabs = Object.keys(productsCatalog);
        const category = tabs[activeIndex];
        const items = productsCatalog[category].items;
    
        const groupedItems = {};
    
        items.forEach(item => {
            const categoryKeys = Object.keys(item.category);
    
            categoryKeys.forEach(key => {
                const categorykeyValue = item.category[key];
    
                if (!groupedItems[key]) {
                    groupedItems[key] = new Set(); // Use a Set for unique values within each key
                }
                groupedItems[key].add(categorykeyValue);
            });
        });
    
        const result = Object.keys(groupedItems).map(key => ({
            label: `By ${key.charAt(0).toUpperCase() + key.slice(1)}`,
            items: Array.from(groupedItems[key]).map(value => ({
                label: value,
                command: () => {
                    const updatedFilterCategories = [...this.state.filterCategories, value];
                    this.setState({ filterCategories: updatedFilterCategories }, () => {
                        this.filterItems(updatedFilterCategories, this.state.activeIndex);
                    });
                }
            }))
        }));
    
        this.setState({ filterMenuItems: result });
    }

    // Method to filter items based on filterCategories
    filterItems = (filterCategories, index) => {
        const tabs = Object.keys(productsCatalog);
        const category = tabs[index];
        const items = productsCatalog[category].items;

        if (filterCategories.length === 0) {
            // Return all items if no categories are specified
            this.setState({ filteredItems: items });
            return;
        }

        // Create a function to check if an item matches all specified categories
        const matchesCategories = (item, categories) => {
            const itemCategories = Object.values(item.category);
            return categories.every(category => itemCategories.includes(category));
        };

        // Filter items based on the filterCategories
        const filteredItems = items.filter(item => matchesCategories(item, filterCategories));

        // Update state with filtered items
        this.setState({ filteredItems });
    }

    // Method to render tab content
    renderTabContent = () => {
        const { filteredItems } = this.state; // Use filteredItems from state
    
        // Sort the filteredItems array by name
        const sortedItems = [...filteredItems].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    
        return sortedItems.map((item, index) => (
            <Card key={index} className="border-round-2xl shadow-2 md:w-16rem w-full">
                <div className='flex flex-column gap-2 md:gap-4'>
                    <div className='flex justify-content-end'>
                        <Tag severity="success" value={item.pack}></Tag>
                    </div>
                    <div className='flex flex-column h-12rem justify-content-center md:gap-4'>
                        <div className=' border-round-2xl overflow-hidden'>
                            <Image
                                src={process.env.PUBLIC_URL + '/assets/productsScreen/productImages/' + item.image}
                                alt={item.name || 'Product Image'}
                                width="100%"
                                height="100%"
                                style={{ objectFit: 'cover' }}
                                preview
                            />
                        </div>
                    </div>
                    <div className='flex flex-column md:gap-2 text-center'>
                        <div className='text-base md:text-xl text-800 font-semibold md:h-3rem h-2rem mt-2 md:mt-0'>{item.name}</div>
                        <div className='text-xs text-500 font-medium md:h-3rem h-2rem'>{item.composition}</div>
                        <div className='flex flex-column gap-2 text-600 mt-2 text-xs md:text-sm'>
                            <div className='align-self-center border-1 border-300 border-round-2xl px-3 py-1 w-full'><i className="mr-1 pi pi-tag text-xs"></i> {item.category.dosage}</div>
                            <div className='align-self-center border-1 border-300 border-round-2xl px-3 py-1 w-full'><i className="mr-1 pi pi-tag text-xs"></i> {item.category.therpatic}</div>
                        </div>
                    </div>
                </div>
            </Card>
        ));
    }

    render() {
        return (
            <div className='app-base-font-family md:mt-6 mt-3 md:mx-8 px-4 md:px-8'>
                <div className='flex flex-column md:gap-6 gap-3'>
                    <div className='flex flex-column gap-2 md:gap-4 mt-4'>
                        <div className='font-medium text-3xl md:text-6xl text-gray-700'>Our Products</div>
                        <div className='font-medium line-height-4 text-gray-600 md:pl-1 md:text-base text-sm'>Our company is offering the wide range of the pharma products with the best quality.</div>
                    </div>
                    <TabMenu
                        model={this.getTabItems()}
                        activeIndex={this.state.activeIndex}
                        className='align-self-center md:px-8'
                    />
                    <div className='flex flex-column gap-4'>
                        <div className='flex flex-wrap gap-2 justify-content-center md:gap-4 md:justify-content-start md:px-0 px-1'>
                            {this.state.filterCategories.map( (category,index) => {
                                return (<Chip label={category} removable
                                    key={index}
                                    className='w-fit text-sm md:text-base'
                                    onRemove={() => {
                                        const updatedFilterCategories = this.state.filterCategories.filter(item => item !== category)
                                        this.setState({ filterCategories: updatedFilterCategories })
                                        this.filterItems(updatedFilterCategories, this.state.activeIndex);
                                    }} />)
                            })}
                            <TieredMenu model={this.state.filterMenuItems} popup ref={this.menu} breakpoint="767px" />
                            <Button label="Add Filter" severity="secondary" outlined icon="pi pi-plus" rounded onClick={(e) => this.menu.current.toggle(e)} 
                                className='text-sm md:text-base mt-2 md:mt-0'/>
                        </div>
                        <div className="flex gap-4 mt-2 md:mt-4 mb-4 md:mb-8 md:flex-row flex-column">
                            {this.renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
