import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

// Global flash deal ends in 2 hours
const FLASH_DEAL_END_TIME = new Date().getTime() + 2 * 60 * 60 * 1000;

// Per product countdown hook
function useCountdown(endTime) {
  const [timeLeft, setTimeLeft] = useState(endTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = endTime - new Date().getTime();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}

// Format milliseconds to hh:mm:ss
const formatTime = (ms) => {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const FlashDealPage = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.product);

  // Filters & sort state
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("popularity");

  // Sort function
  const sortProducts = (a, b) => {
    switch (sortOption) {
      case "priceLow":
        return a.price - b.price;
      case "priceHigh":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "popularity":
      default:
        return (b.sold || 0) - (a.sold || 0);
    }
  };

  // Filter & sort products flagged as flash deal
  const filteredProducts = (products || [])
    .filter(
      (p) =>
        p.isFlashDeal &&
        (categoryFilter ? p.category === categoryFilter : true)
    )
    .sort(sortProducts);

  const categories = [...new Set(products?.map((p) => p.category))];

  return (
    <Container className="my-5">
      <h2 className="mb-3 text-center fw-bold text-uppercase">Flash Deal</h2>

      {/* Global Countdown */}
      <div className="text-center mb-5 fs-4">
        Deal ends in:{" "}
        <Badge bg="danger" className="fs-5 px-3 py-2">
          {formatTime(FLASH_DEAL_END_TIME - new Date().getTime())}
        </Badge>
      </div>

      {/* Filters */}
      <Row className="mb-4 justify-content-center">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            aria-label="Sort products"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Products */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center fs-5">No flash deal products found.</p>
      ) : (
        <Row className="g-4">
          {filteredProducts.map((product) => {
            // Each product countdown timer (for demo same end time, can be dynamic)
            const productCountdown = useCountdown(
              product.flashDealEndTime || FLASH_DEAL_END_TIME
            );

            return (
              <Col
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="d-flex"
              >
                <Card className="shadow-sm flex-fill d-flex flex-column">
                  <div className="position-relative overflow-hidden" style={{ height: 220 }}>
                    <Card.Img
                      src={product.image || "/images/placeholder.jpg"}
                      alt={product.name}
                      className="h-100 w-100 object-fit-cover"
                    />
                    <Badge
                      bg="danger"
                      className="position-absolute top-0 start-0 m-2 px-2 py-1 fs-6"
                    >
                      Flash Deal
                    </Badge>
                    {product.stock && product.stock < 5 && (
                      <Badge
                        bg="warning"
                        text="dark"
                        className="position-absolute top-0 end-0 m-2 px-2 py-1 fs-6"
                      >
                        Only {product.stock} left
                      </Badge>
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-6 fw-semibold">{product.name}</Card.Title>

                    <div className="mb-2">
                      <span className="fw-bold fs-5 text-danger">
                        Tk. {product.price}
                      </span>{" "}
                      <del className="text-muted">{product.originalPrice && `Tk. ${product.originalPrice}`}</del>
                    </div>

                    {/* Per product countdown */}
                    <div className="mb-3 text-center text-danger fs-6 fw-semibold">
                      Deal ends in: {formatTime(productCountdown)}
                    </div>

                    <Button
                      variant="warning"
                      className="mt-auto"
                      onClick={() => dispatch(addToCart(product))}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default FlashDealPage;
