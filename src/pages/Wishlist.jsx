import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(removeFromWishlist(item.id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your wishlist is empty.</h3>
        <Link to="/" className="btn btn-primary mt-3">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Wishlist</h2>
      <div className="row">
        {wishlistItems.map((item) => (
          <div key={item.id} className="col-sm-6 col-md-4 mb-4">
            <div className="card h-100">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image || '/default.jpg'}
                  className="card-img-top"
                  alt={item.title}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">৳{item.price}</p>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleMoveToCart(item)}
                  >
                    Move to Cart
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
