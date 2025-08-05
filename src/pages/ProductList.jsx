import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const dummyProducts = [
  {
    _id: '1',
    title: 'Voyage Classic Shirt',
    price: 1299,
    image: '/images/shirt1-1.jpg',
    category: 'shirt',
  },
  {
    _id: '2',
    title: 'Voyage Denim Jeans',
    price: 1799,
    image: '/images/denim1.jpg',
    category: 'jeans',
  },
  {
    _id: '3',
    title: 'Voyage Plain T-Shirt',
    price: 899,
    image: '/images/tshirt1.jpg',
    category: 'tshirt',
  },
  // Add more dummy products here
];

const ProductList = () => {
  const { slug } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!slug) {
      setFilteredProducts(dummyProducts);
      return;
    }
    // Filter products by category slug (case insensitive)
    const filtered = dummyProducts.filter(
      (product) => product.category.toLowerCase() === slug.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [slug]);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-capitalize">{slug ? slug : 'All'} Products</h2>

      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
