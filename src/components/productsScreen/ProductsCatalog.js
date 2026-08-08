import React, { Component, createRef, useState } from 'react';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import { ProgressSpinner } from 'primereact/progressspinner';

const API_URL = process.env.REACT_APP_CATALOG_API_URL || "YOUR_DEPLOYED_APPS_SCRIPT_WEB_APP_URL";
const CACHE_KEY = "products_catalog_cache";
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour TTL

/**
 * Helper function to transform Google Drive Image IDs or Links into direct image URLs
 */
const getImageUrl = (item) => {
    if (item?.imageId) {
        return `https://lh3.googleusercontent.com/d/${item.imageId}`;
    }
    if (item?.image) {
        return item.image;
    }
    if (item?.rawUrl && item.rawUrl.includes('/d/')) {
        const match = item.rawUrl.match(/\/d\/([^/]+)/);
        if (match && match[1]) {
            return `https://lh3.googleusercontent.com/d/${match[1]}`;
        }
    }
    return '';
};

/**
 * Image Component with Direct Google Drive URL Resolution and Fallbacks
 */
const ProductImage = ({ item }) => {
    const [hasError, setHasError] = useState(false);
    const imageUrl = getImageUrl(item);

    if (hasError || !imageUrl) {
        return (
            <div className="flex flex-column align-items-center justify-content-center w-full h-full border-round-2xl p-4 text-center gap-2 select-none border-1 border-dashed border-200 bg-white">
                <div className="w-3rem h-3rem border-circle surface-100 flex align-items-center justify-content-center shadow-1">
                    <i className="pi pi-image text-400 text-xl"></i>
                </div>
                <span className="text-xs font-medium text-500">No image available</span>
            </div>
        );
    }

    return (
        <Image
            src={imageUrl}
            alt={item?.name || 'Product Image'}
            width="100%"
            height="100%"
            imageStyle={{ objectFit: 'contain', height: '190px', width: '100%', borderRadius: '16px' }}
            preview
            onError={() => setHasError(true)}
        />
    );
};

/**
 * Category Header Icon Component with Direct Drive URL Support
 */
const CategoryHeaderImage = ({ categoryData, alt, isActive }) => {
    const [hasError, setHasError] = useState(false);
    const imageUrl = getImageUrl(categoryData);

    if (hasError || !imageUrl) {
        return (
            <div className={`w-2rem h-2rem border-circle flex align-items-center justify-content-center transition-all ${isActive ? 'bg-emerald-500 text-white' : 'surface-200 text-500'}`}>
                <i className="pi pi-box text-xs"></i>
            </div>
        );
    }

    return (
        <img
            alt={alt}
            src={imageUrl}
            loading="lazy"
            onError={() => setHasError(true)}
            className={`w-2rem h-2rem border-circle object-cover transition-all transition-duration-300 ${
                isActive ? 'ring-2 ring-emerald-500 scale-105' : 'opacity-70'
            }`}
        />
    );
};

export default class ProductsCatalog extends Component {
    constructor(props) {
        super(props);
        this.menu = createRef();
        this.state = {
            productsCatalog: {},
            loading: true,
            error: null,
            activeIndex: 0,
            filterCategories: [],
            filterMenuItems: [],
            filteredItems: []
        };
    }

    componentDidMount = () => {
        this.fetchCatalogData();
    };

    fetchCatalogData = async (forceRefresh = false) => {
        this.setState({ loading: true, error: null });

        if (!forceRefresh) {
            try {
                const cachedData = localStorage.getItem(CACHE_KEY);
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData);
                    if (Date.now() - timestamp < CACHE_DURATION_MS && data && Object.keys(data).length > 0) {
                        this.processCatalogData(data);
                        return;
                    }
                }
            } catch (err) {
                console.warn("Failed to read cache:", err);
            }
        }

        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
            } catch (e) {
                console.warn("Failed to write cache:", e);
            }

            this.processCatalogData(data);
        } catch (err) {
            console.error("Failed to load catalog data:", err);
            this.setState({
                error: "Unable to connect to the catalog server. Please check your network connection.",
                loading: false
            });
        }
    };

    processCatalogData = (data) => {
        this.setState({ productsCatalog: data, loading: false }, () => {
            const tabs = Object.keys(data);
            if (tabs.length > 0) {
                this.getFilterMenuItems(this.state.activeIndex);
                this.filterItems(this.state.filterCategories, this.state.activeIndex);
            }
        });
    };

    getFilterMenuItems = (activeIndex) => {
        const { productsCatalog } = this.state;
        const tabs = Object.keys(productsCatalog);
        if (!tabs.length) return;

        const category = tabs[activeIndex];
        const items = productsCatalog[category]?.items || [];

        const groupedItems = {};

        items.forEach((item) => {
            if (!item.category) return;
            Object.keys(item.category).forEach((key) => {
                const val = item.category[key];
                if (!groupedItems[key]) groupedItems[key] = new Set();
                if (val) groupedItems[key].add(val);
            });
        });

        const result = Object.keys(groupedItems).map((key) => ({
            label: `By ${key.charAt(0).toUpperCase() + key.slice(1)}`,
            items: Array.from(groupedItems[key]).map((value) => ({
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
    };

    filterItems = (filterCategories, index) => {
        const { productsCatalog } = this.state;
        const tabs = Object.keys(productsCatalog);
        if (!tabs.length) return;

        const category = tabs[index];
        const items = productsCatalog[category]?.items || [];

        if (filterCategories.length === 0) {
            this.setState({ filteredItems: items });
            return;
        }

        const matchesCategories = (item, categories) => {
            if (!item.category) return false;
            const itemCategories = Object.values(item.category);
            return categories.every((cat) => itemCategories.includes(cat));
        };

        const filteredItems = items.filter((item) => matchesCategories(item, filterCategories));
        this.setState({ filteredItems });
    };

    renderCategorySelector = () => {
        const { productsCatalog, activeIndex } = this.state;
        const categories = Object.keys(productsCatalog);

        return (
            <div className="inline-flex flex-wrap align-items-center justify-content-center p-2 border-round-3xl surface-100 border-1 border-200 gap-1 select-none overflow-hidden max-w-full">
                {categories.map((catKey, index) => {
                    const label = catKey.charAt(0).toUpperCase() + catKey.slice(1);
                    const categoryData = productsCatalog[catKey];
                    const isActive = activeIndex === index;

                    return (
                        <button
                            key={catKey}
                            type="button"
                            onClick={() => {
                                this.setState({ activeIndex: index, filterCategories: [] });
                                this.getFilterMenuItems(index);
                                this.filterItems([], index);
                            }}
                            className={`flex align-items-center gap-3 px-5 py-2 md:py-3 border-round-2xl border-none cursor-pointer transition-all transition-duration-200 outline-none ${
                                isActive
                                    ? 'surface-0 shadow-2 text-gray-900 font-extrabold'
                                    : 'bg-transparent text-gray-600 hover:text-gray-900 font-medium hover:surface-200'
                            }`}
                        >
                            <CategoryHeaderImage categoryData={categoryData} alt={label} isActive={isActive} />
                            <span className="text-sm md:text-base tracking-tight">{label}</span>
                        </button>
                    );
                })}
            </div>
        );
    };

    renderTabContent = () => {
        const { filteredItems } = this.state;

        if (filteredItems.length === 0) {
            return (
                <div className="w-full flex flex-column align-items-center justify-content-center p-6 border-round-3xl surface-0 text-center gap-3 my-4 border-1 border-100 shadow-1">
                    <div className="w-4rem h-4rem border-circle bg-emerald-50 flex align-items-center justify-content-center">
                        <i className="pi pi-filter-slash text-2xl text-emerald-600"></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">No matching products found</div>
                    <p className="text-gray-500 text-sm m-0 max-w-20rem">We couldn't find any products matching your current filters.</p>
                    <Button
                        label="Reset All Filters"
                        icon="pi pi-refresh"
                        className="p-button-outlined p-button-success border-round-pill mt-2 px-4"
                        onClick={() => {
                            this.setState({ filterCategories: [] });
                            this.filterItems([], this.state.activeIndex);
                        }}
                    />
                </div>
            );
        }

        const sortedItems = [...filteredItems].sort((a, b) => {
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });

        return sortedItems.map((item, index) => (
            <Card
                key={index}
                className="border-1 border-200 border-round-3xl shadow-1 hover:shadow-3 transition-all transition-duration-300 w-full sm:w-20rem surface-0 flex flex-column p-2"
            >
                <div className="flex flex-column gap-3 h-full">
                    {/* Pack Size Pill (Green Pill) */}
                    <div className="flex justify-content-end align-items-center px-2 pt-1">
                        <Tag
                            value={item.pack || 'Standard'}
                            className="px-3 py-1 text-xs text-emerald-700"
                            severity="success"
                            rounded
                        />
                    </div>

                    {/* Image Container */}
                    <div className="flex justify-content-center align-items-center relative" style={{ height: '190px' }}>
                        <ProductImage item={item} />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-column gap-2 text-center mt-1 flex-grow-1 px-2 pb-2">
                        <div className="text-xl text-gray-900 font-extrabold line-height-2" style={{ minHeight: '2.8rem' }}>
                            {item.name}
                        </div>
                        <div className="text-xs text-gray-500 font-medium line-height-3" style={{ minHeight: '2rem' }}>
                            {item.composition}
                        </div>

                        {/* Category Badges (Pill Shape) */}
                        <div className="flex flex-column gap-2 mt-auto pt-3 text-xs">
                            {item.category?.dosage && (
                                <div className="bg-gray-50 border-1 border-200 border-round-xl px-3 py-2 flex align-items-center justify-content-center gap-2">
                                    <i className="pi pi-tag text-emerald-600 text-xs"></i>
                                    <span className="font-semibold text-gray-700">{item.category.dosage}</span>
                                </div>
                            )}
                            {item.category?.therpatic && (
                                <div className="bg-gray-50 border-1 border-200 border-round-xl px-3 py-2 flex align-items-center justify-content-center gap-2">
                                    <i className="pi pi-briefcase text-emerald-600 text-xs"></i>
                                    <span className="font-semibold text-gray-700">{item.category.therpatic}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        ));
    };

    render() {
        const { loading, error, productsCatalog } = this.state;

        if (loading) {
            return (
                <div className="flex flex-column justify-content-center align-items-center gap-4" style={{ minHeight: '65vh' }}>
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="3" animationDuration=".8s" />
                    <span className="text-gray-600 font-medium text-lg">Preparing pharmaceutical catalog...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex justify-content-center align-items-center p-4" style={{ minHeight: '65vh' }}>
                    <div className="surface-0 border-1 border-100 border-round-3xl shadow-3 p-6 text-center flex flex-column align-items-center max-w-30rem gap-3">
                        <div className="w-4rem h-4rem border-circle bg-red-50 flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-circle text-3xl text-red-500"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 m-0">Catalog Unavailable</h3>
                        <p className="text-gray-500 text-sm m-0 line-height-3">{error}</p>
                        <Button
                            label="Try Again"
                            icon="pi pi-refresh"
                            className="p-button-emerald border-round-pill mt-3 px-5 py-3 font-bold"
                            onClick={() => this.fetchCatalogData(true)}
                        />
                    </div>
                </div>
            );
        }

        if (!Object.keys(productsCatalog).length) {
            return (
                <div className="flex justify-content-center align-items-center p-4" style={{ minHeight: '65vh' }}>
                    <div className="surface-0 border-1 border-100 border-round-3xl shadow-2 p-6 text-center flex flex-column align-items-center max-w-30rem gap-3">
                        <div className="w-4rem h-4rem border-circle bg-emerald-50 flex align-items-center justify-content-center">
                            <i className="pi pi-inbox text-3xl text-emerald-600"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 m-0">No Products Found</h3>
                        <p className="text-gray-500 text-sm m-0">The catalog spreadsheet does not contain any categories yet.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
                <div className="flex flex-column gap-5 align-items-center">
                    
                    {/* Header */}
                    <div className="flex flex-column gap-4 text-center align-items-center max-w-30rem">
                        <h1 className="font-black text-4xl md:text-5xl text-gray-900 m-0 tracking-tight">Our Products</h1>
                        <p className="font-normal text-gray-500 text-base md:text-lg m-0 line-height-4">
                            Explore our comprehensive range of high-quality, certified pharmaceutical products.
                        </p>
                    </div>

                    {/* Segmented Category Header Pill */}
                    <div className="w-full flex justify-content-center my-2">
                        {this.renderCategorySelector()}
                    </div>

                    {/* Filter Bar and Content Grid */}
                    <div className="flex flex-column gap-4 w-full align-items-center">
                        
                        {/* Active Filter Bar */}
                        <div className="flex flex-wrap gap-2 align-items-center justify-content-center w-full">
                            {this.state.filterCategories.map((category, index) => (
                                <Chip
                                    label={category}
                                    removable
                                    key={index}
                                    className="bg-emerald-50 text-emerald-800 text-xs md:text-sm border-round-pill px-3 py-2 font-bold border-1 border-emerald-200"
                                    onRemove={() => {
                                        const updatedFilterCategories = this.state.filterCategories.filter((item) => item !== category);
                                        this.setState({ filterCategories: updatedFilterCategories });
                                        this.filterItems(updatedFilterCategories, this.state.activeIndex);
                                    }}
                                />
                            ))}

                            <TieredMenu model={this.state.filterMenuItems} popup ref={this.menu} breakpoint="767px" />

                            <Button
                                label="Filter Products"
                                severity="secondary"
                                outlined
                                icon="pi pi-sliders-h"
                                rounded
                                onClick={(e) => this.menu.current.toggle(e)}
                                className="text-xs md:text-sm border-round-pill px-4 py-2 font-semibold surface-0 text-gray-800 border-200 shadow-1 hover:shadow-2"
                            />

                            {this.state.filterCategories.length > 0 && (
                                <Button
                                    label="Clear All"
                                    severity="secondary"
                                    text
                                    rounded
                                    className="ml-2"
                                    onClick={() => {
                                        this.setState({ filterCategories: [] });
                                        this.filterItems([], this.state.activeIndex);
                                    }}
                                />
                            )}
                        </div>

                        {/* Product Cards Grid */}
                        <div className="flex flex-wrap gap-4 mt-2 mb-8 justify-content-center w-full">
                            {this.renderTabContent()}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}