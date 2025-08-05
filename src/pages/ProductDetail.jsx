import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const dummyProduct = {
  id: '1',
  title: 'Voyage Classic Shirt',
  brand: 'Voyage',
  price: 1299,
  originalPrice: 1599,
  sku: 'VS-CL-001',
  colors: ['#000000', '#ffffff', '#4a90e2'], // black, white, blue
  images: [
    '/images/shirt1-1.jpg',
    '/images/shirt1-2.jpg',
    '/images/shirt1-3.jpg',
  ],
  description:
    'A stylish and comfortable shirt perfect for any occasion. Made from premium cotton fabric.',
  fabric: '100% Premium Cotton',
  care: 'Machine wash cold, tumble dry low.',
  styleTips: 'Pair with jeans or chinos for a casual look.',
  sizes: [
    { size: 'S', inStock: true },
    { size: 'M', inStock: true },
    { size: 'L', inStock: false },
    { size: 'XL', inStock: true },
  ],
  reviews: [
    { id: 1, user: 'Alice', rating: 5, comment: 'Great quality!', date: '2024-07-01' },
    { id: 2, user: 'Bob', rating: 4, comment: 'Fits well and looks nice.', date: '2024-07-05' },
  ],
  stockStatus: 'In Stock',
  shippingInfo: 'Free shipping on orders over ৳2000. Delivery in 3-5 days.',
  returnPolicy: '30-day return and exchange policy.',
};

const relatedProductsDummy = [
  {
    id: '2',
    title: 'Voyage Slim Fit Shirt',
    price: 1399,
    image: '/images/shirt2-1.jpg',
  },
  {
    id: '3',
    title: 'Voyage Casual Polo',
    price: 1499,
    image: '/images/polo1.jpg',
  },
  {
    id: '4',
    title: 'Voyage Formal Shirt',
    price: 1599,
    image: '/images/shirt3-1.jpg',
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // TODO: Replace dummyProduct with API fetch by id
  const product = dummyProduct;

  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => s.inStock)?.size || product.sizes[0].size
  );
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(product.reviews);

  const [reviewForm, setReviewForm] = useState({
    user: '',
    rating: 5,
    comment: '',
  });

  const averageRating =
    reviews.length
      ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
      : 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
        size: selectedSize,
        color: selectedColor,
        image: selectedImage,
      })
    );
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    // Simplified for demo: add to cart and redirect to checkout page
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
        size: selectedSize,
        color: selectedColor,
        image: selectedImage,
      })
    );
    window.location.href = '/checkout';
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.user.trim() || !reviewForm.comment.trim()) {
      alert('Please fill in your name and comment.');
      return;
    }
    const newReview = {
      id: Date.now(),
      user: reviewForm.user.trim(),
      rating: reviewForm.rating,
      comment: reviewForm.comment.trim(),
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [newReview, ...prev]);
    setReviewForm({ user: '', rating: 5, comment: '' });
  };

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href="/category/shirts">Shirts</a></li>
          <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
        </ol>
      </nav>

      <div className="row">
        {/* Image Gallery */}
        <div className="col-md-6 mb-4">
          <img
            src={selectedImage}
            alt={product.title}
            className="img-fluid rounded mb-3"
            style={{ cursor: 'zoom-in' }}
            onClick={() => window.open(selectedImage, '_blank')}
          />
          <div className="d-flex">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className={`img-thumbnail me-2 ${img === selectedImage ? 'border-primary' : ''}`}
                style={{ width: '60px', cursor: 'pointer' }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">Brand: {product.brand}</p>

          <div className="mb-2">
            <strong>Rating: </strong> {averageRating.toFixed(1)} / 5 {' '}
            <span>{'⭐'.repeat(Math.round(averageRating))}</span> ({reviews.length} reviews)
          </div>

          <div className="mb-3">
            <span className="fs-4 text-success me-3">৳{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-muted text-decoration-line-through">৳{product.originalPrice}</span>
            )}
          </div>

          <p><strong>SKU:</strong> {product.sku}</p>

          {/* Color Swatches */}
          <div className="mb-3">
            <strong>Colors:</strong>
            <div className="d-flex align-items-center mt-1">
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    backgroundColor: color,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    marginRight: 10,
                    cursor: 'pointer',
                    border: selectedColor === color ? '2px solid #000' : '1px solid #ccc',
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-3">
            <label htmlFor="size" className="form-label">
              Select Size:
            </label>
            <select
              id="size"
              className="form-select w-auto"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map(({ size, inStock }) => (
                <option
                  key={size}
                  value={size}
                  disabled={!inStock}
                >
                  {size} {inStock ? '' : '(Out of Stock)'}
                </option>
              ))}
            </select>
            <button
              className="btn btn-link p-0 mt-1"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#sizeGuideModal"
            >
              View Size Guide
            </button>
          </div>

          {/* Quantity Selector */}
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              className="form-control w-auto"
              min={1}
              max={10}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Math.min(10, +e.target.value)))
              }
            />
          </div>

          {/* Stock Status */}
          <p>
            <strong>Availability:</strong> {product.stockStatus}
          </p>

          {/* Add to Cart & Buy Now */}
          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-primary flex-grow-1" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-success flex-grow-1" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {/* Wishlist & Share */}
          <div className="mb-3 d-flex gap-3 align-items-center">
            <button className="btn btn-outline-secondary">
              Save to Wishlist
            </button>
            <div>
              <strong>Share:</strong>{' '}
              <a href="#" aria-label="Share on Facebook" className="me-2">Facebook</a>
              <a href="#" aria-label="Share on Twitter" className="me-2">Twitter</a>
              <a href="#" aria-label="Share on Instagram">Instagram</a>
            </div>
          </div>

          {/* Shipping & Returns Info */}
          <div className="mb-3">
            <h5>Shipping & Returns</h5>
            <p>{product.shippingInfo}</p>
            <p>{product.returnPolicy}</p>
          </div>

          {/* Product Description, Fabric, Care & Tips */}
          <div>
            <h5>Description</h5>
            <p>{product.description}</p>

            <h6>Fabric/Material</h6>
            <p>{product.fabric}</p>

            <h6>Care Instructions</h6>
            <p>{product.care}</p>

            <h6>Style Tips</h6>
            <p>{product.styleTips}</p>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <div className="modal fade" id="sizeGuideModal" tabIndex="-1" aria-labelledby="sizeGuideModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="sizeGuideModalLabel">Size Guide</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest (inches)</th>
                    <th>Waist (inches)</th>
                    <th>Length (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>S</td><td>36-38</td><td>30-32</td><td>28</td></tr>
                  <tr><td>M</td><td>38-40</td><td>32-34</td><td>29</td></tr>
                  <tr><td>L</td><td>40-42</td><td>34-36</td><td>30</td></tr>
                  <tr><td>XL</td><td>42-44</td><td>36-38</td><td>31</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-5">
        <h3>Customer Reviews</h3>

        {/* Review Submission Form */}
        <form className="mb-4" onSubmit={handleReviewSubmit}>
          <h5>Submit a Review</h5>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">Your Name</label>
            <input
              type="text"
              id="user"
              name="user"
              className="form-control"
              value={reviewForm.user}
              onChange={handleReviewInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating</label>
            <select
              id="rating"
              name="rating"
              className="form-select w-auto"
              value={reviewForm.rating}
              onChange={handleReviewInputChange}
            >
              {[5,4,3,2,1].map((r) => (
                <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comment</label>
            <textarea
              id="comment"
              name="comment"
              rows="3"
              className="form-control"
              value={reviewForm.comment}
              onChange={handleReviewInputChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-outline-primary">
            Submit Review
          </button>
        </form>

        {/* List Reviews */}
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="list-group">
            {reviews.map((review) => (
              <li key={review.id} className="list-group-item">
                <strong>{review.user}</strong> —{' '}
                <span>{'⭐'.repeat(review.rating)}</span>
                <br />
                <small className="text-muted">{review.date}</small>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-5">
        <h3>Related Products</h3>
        <div className="d-flex flex-wrap gap-3">
          {relatedProductsDummy.map((relProd) => (
            <div
              key={relProd.id}
              className="card"
              style={{ width: '12rem', cursor: 'pointer' }}
              onClick={() => window.location.href = `/product/${relProd.id}`}
            >
              <img
                src={relProd.image}
                className="card-img-top"
                alt={relProd.title}
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body p-2">
                <h6 className="card-title mb-1">{relProd.title}</h6>
                <p className="card-text text-success">৳{relProd.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
