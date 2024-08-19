'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {FaCartPlus, FaCheck, FaHeart, FaThumbsUp, FaTimes} from 'react-icons/fa'

export default function Home() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('price');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products', {
                    params: { category, minPrice, maxPrice, sortBy }
                });
                setProducts(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, [category, minPrice, maxPrice, sortBy]);

    return (
      <div>
      <div>
        <nav className="bg-blue-400 p-4 flex items-center justify-center">
        <h1 className="text-2xl font-bold my-4">Online store</h1>
        </nav>
        <div className="bg-blue-400 p-4 flex items-end justify-end space-x-4">
          <button className='bg-green-300 rounded py-2 px-4'>Login</button>
          <button className='bg-green-300 rounded py-2 px-4'>Register</button>
        </div>
        </div>
        <div className="container mx-auto px-4 mt-4">
            <div className="flex space-x-4 mb-4 items-end justify-end mt-4">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 border rounded"
                >
                    <option value="">All Categories</option>
                    <option value="Daily">Daily</option>
                    <option value="Medical">Medical</option>
                    <option value="Food">Food</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border rounded"
                >
                    <option value="price">Sort by Price</option>
                    <option value="name">Sort by Name</option>
                </select>

                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min Price"
                    className="px-4 py-2 border rounded"
                />
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max Price"
                    className="px-4 py-2 border rounded"
                />
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {products.map(product => (
        <li key={product._id} className="p-4 border rounded bg-blue-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{product.name}</h2>
                {product.inStock ? (
                    <div className="flex items-center text-green-600">
                        <FaCheck className="mr-2" />
                        Available
                    </div>
                ) : (
                    <div className="flex items-center text-red-600">
                        <FaTimes className="mr-2" />
                        Out of Stock
                    </div>
                )}
            </div>
            <p className="mb-2">Category: {product.category}</p>
            <p className="mb-4">Price: ${product.price}</p>
            <p className="mb-4">Manufacturer: {product.brand}</p>
            <button
                onClick={() => handleBuyClick(product._id)}
                className="bg-green-300 rounded py-2 px-4 text-black flex items-center justify-center"
            >
                <FaCartPlus className="mr-2" />
                Add to cart
            </button>
        </li>
    ))}
</ul>
        </div>
        </div>
    );
}