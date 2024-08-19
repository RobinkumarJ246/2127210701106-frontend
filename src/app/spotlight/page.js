'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Spotlight() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchSpotlightProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products', {
                    params: { category: 'Spotlight', sortBy: 'price', minPrice: 10, maxPrice: 100 }
                });
                setProducts(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSpotlightProducts();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">Spotlight Products</h1>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <li key={product._id} className="p-4 border rounded">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p>Category: {product.category}</p>
                        <p>Price: ${product.price}</p>
                        <p>Discount: {product.discount}%</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}