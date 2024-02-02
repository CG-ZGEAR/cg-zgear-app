import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {addProduct} from '../../features/product/productReducerService';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({
        productName: '',
        price: '',
        currency: 'USD',
        categoryName: '',
        description: '',
        imageUrls: [],
        specifications: [],
        reviews: [],
        discounts: [],
    });

    const [categories, setCategories] = useState([]);
    const [specTemplates, setSpecTemplates] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchSpecTemplates(selectedCategory);
        }
    }, [selectedCategory]);

    useEffect(() => {
        setProductData((prevProduct) => ({
            ...prevProduct,
            specifications: specTemplates.map((specTemplate) => ({
                specKey: specTemplate.specKey,
                specValue: '',
            })),
        }));
    }, [specTemplates]);

    const fetchSpecTemplates = async (categoryName) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/spec-templates/${categoryName}`);
            setSpecTemplates(response.data);
        } catch (error) {
            console.error('Error fetching specification templates:', error);
        }
    };

    const handleSpecificationChange = (e, specKey) => {
        const {value} = e.target;

        const updatedSpecifications = productData.specifications.map((spec) =>
            spec.specKey === specKey ? {...spec, specValue: value} : spec
        );

        setProductData((prevProduct) => ({
            ...prevProduct,
            specifications: updatedSpecifications,
        }));
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === 'categoryName') {
            setSelectedCategory(value);
            setProductData((prevProduct) => ({
                ...prevProduct,
                [name]: value,
                specifications: [],
            }));
        } else if (name.startsWith('specifications')) {
            const specKey = name.replace('specifications.', '');
            const updatedSpecifications = [...productData.specifications];
            const existingSpec = updatedSpecifications.find((spec) => spec.specKey === specKey);

            if (existingSpec) {
                existingSpec.specValue = value;
            } else {
                updatedSpecifications.push({specKey, specValue: value});
            }

            setProductData((prevProduct) => ({
                ...prevProduct,
                specifications: updatedSpecifications,
            }));
        } else {
            setProductData((prevProduct) => ({
                ...prevProduct,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = e.target.files;

        if (files.length > 0) {
            const urls = Array.from(files).map((file) => URL.createObjectURL(file));
            setProductData((prevProduct) => ({
                ...prevProduct,
                imageUrls: [...prevProduct.imageUrls, ...urls],
            }));
        }
    };

    const handleClearImages = () => {
        setProductData((prevProduct) => ({
            ...prevProduct,
            imageUrls: [],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(addProduct(productData));
            setProductData({
                productName: '',
                price: 0,
                currency: 'USD',
                categoryName: '',
                description: '',
                imageUrls: [],
                specifications: [],
                reviews: [],
                discounts: [],
            });

            setSelectedCategory('');
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Product added successfully.',
            });
        } catch (error) {
            console.error('Error adding product:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add the product. Please try again.',
            });
        }
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-50 mt-3 pt-3">
            <h2 className="mb-4">Add Product</h2>

            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Image Upload:</label>
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                    />
                    <button type="button" className="btn btn-secondary mt-2" onClick={handleClearImages}>
                        Clear Images
                    </button>
                    {productData.imageUrls.length > 0 && (
                        <div className="mt-3">
                            <p>Selected Images:</p>
                            <ul className="list-unstyled">
                                {productData.imageUrls.map((url, index) => (
                                    <li key={index}>
                                        <img src={url} alt={`Image ${index + 1}`} className="img-thumbnail"/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Product Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="productName"
                        value={productData.productName}
                        onChange={handleInputChange}
                        required
                    />

                    <label className="form-label">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        required
                    />

                    <label className="form-label">Currency:</label>
                    <select
                        className="form-select"
                        name="currency"
                        value={productData.currency}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>

                    <label className="form-label">Category:</label>
                    <select
                        className="form-select"
                        name="categoryName"
                        value={selectedCategory}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>

                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        maxLength={1000}
                        required
                    />

                    {specTemplates.length > 0 && (
                        <div className="mt-3">
                            <label className="form-label">Specification Templates:</label>
                            <ul className="list-unstyled">
                                {specTemplates.map((specTemplate) => (
                                    <li key={specTemplate.id}>
                                        <label className="form-label">{specTemplate.specKey}:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name={`specifications.${specTemplate.specKey}`}
                                            value={
                                                productData.specifications.find(
                                                    (spec) => spec.specKey === specTemplate.specKey
                                                )?.specValue || ''
                                            }
                                            onChange={(e) => handleSpecificationChange(e, specTemplate.specKey)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary mt-3">
                        Add Product
                    </button>
                </div>
            </form>
        </div>

    );
};

export default AddProduct;
