import React, { useState } from 'react';
import Categories from '../Categories/Categories';
import NavigationBar from '../NavigationBar/NavigationBar';
import './Home.css';
import Products from '../Products/Products';
import SearchResult from '../SearchResult/SearchResult'; // Import SearchResult component
import { min } from 'date-fns';

function Home() {
    const [categoryId, setCategoryId] = useState(null);
    const [typeId, setTypeId] = useState(null);
    const [searchResult, setSearchResult] = useState(null); // State để lưu trữ kết quả từ API
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)

    const handleCategoryClick = (category_id) => {
        setCategoryId(category_id);
        setTypeId(null);
        setSearchResult(null);
        setMinPrice(null);
        setMaxPrice(null);
    };

    const handleTypeClick = (TypeId) => {
        setTypeId(TypeId);
        setCategoryId(null);
        setSearchResult(null);
        setMinPrice(null);
        setMaxPrice(null);
    };

    const handlePriceRangeClick = (priceRange) => {
        if (priceRange == 'under_10000000') {
            setMinPrice(1)
            setMaxPrice(10000000)
        }
        if (priceRange == '10000000_to_30000000') {
            setMinPrice(10000000)
            setMaxPrice(30000000)
        }
        if (priceRange == '30000000_to_50000000') {
            setMinPrice(30000000)
            setMaxPrice(50000000)
        }
        if (priceRange == 'over_50000000') {
            setMinPrice(50000000)
            setMaxPrice(500000000)
        }
        setTypeId(null);
        setCategoryId(null);
        setSearchResult(null);
    };

    return (
        <div style={{ backgroundColor: "#F8F9FD" }}>
            <NavigationBar handleSearchResult={setSearchResult} /> {/* Pass setSearchResult function as props */}
            <div className="container">
                <div className="row" style={{ margin: "20px 0px" }}>
                    <div className="col-md-3" style={{ padding: "0px" }}>
                        <Categories onCategoryClick={handleCategoryClick} onTypeClick={handleTypeClick} onPriceRangeClick={handlePriceRangeClick} />
                    </div>
                    <div className="col-md-9">
                        {searchResult ? (
                            <SearchResult searchResult={searchResult} /> // Render SearchResult component if searchResult exists
                        ) : (
                            <Products categoryId={categoryId} typeId={typeId} minPrice={minPrice} maxPrice={maxPrice} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
