import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isInWishlist = wishlistItems.some(item => item.id === product._id);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      qty: 1,
    }));
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
      }));
    }
  };

  return (
    <div className="card h-100">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} className="card-img-top" alt={product.title} />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">৳{product.price}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <button onClick={handleAddToCart} className="btn btn-success btn-sm">
            Add to Cart
          </button>
          <button
            onClick={toggleWishlist}
            className={`btn btn-sm ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
