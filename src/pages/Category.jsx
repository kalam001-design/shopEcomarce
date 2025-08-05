// CategoryPage.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Offcanvas,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { items: products, loading } = useSelector((state) => state.product);

  const [sortOption, setSortOption] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 9999]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSort = (a, b) => {
    switch (sortOption) {
      case "priceLow":
        return a.price - b.price;
      case "priceHigh":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return b.id - a.id;
    }
  };

  const filtered = Array.isArray(products)
  ? products
      .filter((p) => (
        p.category?.toLowerCase() === slug?.toLowerCase() &&
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        (sizeFilter ? p.size === sizeFilter : true) &&
        (colorFilter ? p.color === colorFilter : true)
      ))
      .sort(handleSort)
  : [];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const changePage = (page) => setCurrentPage(page);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-capitalize">{slug} Products</h4>
        <div className="d-flex gap-2">
          <Button variant="outline-dark" onClick={() => setShowFilter(true)} className="d-md-none">
            Filters
          </Button>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ width: 180 }}
          >
            <option value="newest">Newest</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </Form.Select>
        </div>
      </div>

      <Row>
        {/* Filter Sidebar (Desktop) */}
        <Col md={3} className="d-none d-md-block">
          <h5>Filter by Price</h5>
          <Form.Range
            min={0}
            max={5000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <p>Under Tk. {priceRange[1]}</p>

          <h6>Size</h6>
          <Form.Select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </Form.Select>

          <h6 className="mt-3">Color</h6>
          <Form.Select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
          </Form.Select>
        </Col>

        {/* Product Grid */}
        <Col md={9}>
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="warning" />
            </div>
          ) : (
            <Row className="g-4">
              {currentProducts.map((product) => (
                <Col key={product.id} sm={6} md={4} lg={3}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={product.image || "/images/placeholder.jpg"}
                      style={{ height: 200, objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title className="fs-6">{product.name}</Card.Title>
                      <p className="fw-bold text-primary">Tk. {product.price}</p>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add to Cart
                      </Button>{" "}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => dispatch(addToWishlist(product))}
                      >
                        Wishlist
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx + 1}
                variant={currentPage === idx + 1 ? "dark" : "light"}
                className="me-2"
                onClick={() => changePage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Mobile Offcanvas Filter */}
      <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h6>Price</h6>
          <Form.Range
            min={0}
            max={5000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <p>Under Tk. {priceRange[1]}</p>

          <h6>Size</h6>
          <Form.Select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </Form.Select>

          <h6 className="mt-3">Color</h6>
          <Form.Select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
          </Form.Select>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default CategoryPage;
