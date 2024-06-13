import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormCheck } from 'react-bootstrap';
import './Categories.css';

function Categories({ onCategoryClick, onTypeClick, onPriceRangeClick }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [selectedType, setSelectedType] = useState(null);
    const [types, setTypes] = useState([]);

    const handlePriceRangeClick = (priceRange) => {
        onPriceRangeClick(priceRange);
        setSelectedType(null);
        setSelectedCategory(null);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    console.error('Access token not found in local storage');
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/getAllCategories/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchTypes = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    console.error('Access token not found in local storage');
                    return;
                }
                const response = await axios.get('http://127.0.0.1:8000/api/getAllType/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setTypes(response.data);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        fetchCategories();
        fetchTypes();
    }, []);

    const handleClick = (category_id) => {
        setSelectedCategory(category_id);
        setSelectedType(null);
        onPriceRangeClick(null);
        onCategoryClick(category_id);
    };

    const handleClickType = (id) => {
        setSelectedType(id);
        setSelectedCategory(null);
        onPriceRangeClick(null);
        onTypeClick(id);
    };

    return (
        <div style={{ backgroundColor: "#ffffff", padding: "10px 20px", borderRadius: "20px" }}>
            <h5>Bộ lọc nâng cao</h5>
            <h6 style={{ paddingTop: "10px", borderTop: "1px solid" }}>Danh mục sản phẩm</h6>
            <Form>
                {categories.map(category => (
                    <Form.Check
                        key={category.category_id}
                        type="checkbox"
                        id={category.category_id}
                        label={category.name}
                        checked={selectedCategory === category.category_id}
                        onChange={() => handleClick(category.category_id)}
                    />
                ))}
            </Form>

            <h6 style={{ paddingTop: "10px", borderTop: "1px solid" }}>Đối tượng sản phẩm</h6>
            <Form>
                {types.map(type => (
                    <FormCheck
                        key={type.id}
                        type="checkbox"
                        id={type.id}
                        label={type.name}
                        checked={selectedType === type.id}
                        onChange={() => handleClickType(type.id)}
                    />
                ))}
            </Form>

            <h6 style={{ paddingTop: "10px", borderTop: "1px solid" }}>Giá bán</h6>
            <ul className='p-0 m-0'>
                <li className='select-price' onClick={() => handlePriceRangeClick('under_10000000')}>Dưới 10.000.000đ</li>
                <li className='select-price' onClick={() => handlePriceRangeClick('10000000_to_30000000')}>10.000.000đ đến 30.000.000đ</li>
                <li className='select-price' onClick={() => handlePriceRangeClick('30000000_to_50000000')}>30.000.000đ đến 50.000.000đ</li>
                <li className='select-price' onClick={() => handlePriceRangeClick('over_50000000')}>Trên 50.000.000đ</li>
            </ul>
        </div>
    );
}

export default Categories;
