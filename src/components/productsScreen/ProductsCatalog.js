import React, { Component, createRef } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import productsCatalog from '../../data/productsCatalog.json';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';

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
        const imagePath = `${process.env.PUBLIC_URL}/productCategoryImages/${categoryImage}`;

        return (
            <div className="align-items-center flex flex-column gap-4 p-4" onClick={options.onClick} style={{ cursor: 'pointer' }} key={index}>
                <img
                    alt={item.label}
                    src={imagePath}
                    className='h-8rem w-8rem app-products-header-image'
                />
                <span className='font-medium text-800 text-lg'>{item.label}</span>
            </div>
        );
    };

    getFilterMenuItems = (activeIndex) => {
        const tabs = Object.keys(productsCatalog);
        const category = tabs[activeIndex];
        const items = productsCatalog[category].items;

        const groupedItems = {};

        // Dynamically group items by each key in the 'category' object
        items.forEach(item => {
            const categoryKeys = Object.keys(item.category);

            /* Iterating through each key in category of an item */
            categoryKeys.forEach(key => {
                const categorykeyValue = item.category[key];

                /* Creating for the category key if not already present in variable groupedItems */
                if (!groupedItems[key]) {
                    groupedItems[key] = [];
                }

                groupedItems[key].push({
                    label: categorykeyValue,
                    command: () => {
                        const updatedFilterCategories = [...this.state.filterCategories, categorykeyValue]
                        this.setState({ filterCategories: updatedFilterCategories })
                        this.filterItems(updatedFilterCategories, this.state.activeIndex);
                    },
                    ...item
                });
            });
        });

        // Construct the result array for only two levels
        const result = Object.keys(groupedItems).map(key => ({
            label: `By ${key.charAt(0).toUpperCase() + key.slice(1)}`, // Capitalize the first letter of the key
            items: groupedItems[key]
        }));

        this.setState({ filterMenuItems: result })
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
        return filteredItems.map((item, index) => (
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
                        className='align-self-center px-8'
                    />
                    <div className='flex flex-column gap-4'>
                        <div className='flex gap-4'>
                            {this.state.filterCategories.map(category => {
                                return (<Chip label={category} removable onRemove={() => {
                                    const updatedFilterCategories = this.state.filterCategories.filter(item => item !== category)
                                    this.setState({ filterCategories: updatedFilterCategories })
                                    this.filterItems(updatedFilterCategories, this.state.activeIndex);
                                }} />)
                            })}
                            <TieredMenu model={this.state.filterMenuItems} popup ref={this.menu} breakpoint="767px" />
                            <Button label="Add Filter" severity="secondary" outlined icon="pi pi-plus" rounded onClick={(e) => this.menu.current.toggle(e)} />
                        </div>
                        <div className="flex gap-4 mt-4 mb-8">
                            {this.renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
