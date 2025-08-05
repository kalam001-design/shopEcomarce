import React, { useState } from 'react';
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Badge,
  NavDropdown,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { logout } from '../redux/authSlice';
import { selectWishlistItems, selectCartItems, selectUser } from '../redux/selectors';

import SearchIcon from '../assets/icons/search.png';
import FlashIcon from '../assets/icons/flash.png';
import OfferIcon from '../assets/icons/gift.png';
import HeartIcon from '../assets/icons/package.png';
import CartIcon from '../assets/icons/cart1.png';
import UserIcon from '../assets/icons/user.png';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector(selectWishlistItems);
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);
  const totalItems = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  const mainCategories = [
    { name: 'PANJABI', slug: 'panjabi' },
    {
      name: 'T-SHIRT',
      slug: 'tshirt',
      hasDropdown: true,
      subcategories: ['Regular T-Shirt', 'Premium T-Shirt', 'Graphic T-Shirt', 'Polo T-Shirt'],
    },
    {
      name: 'SHIRT',
      slug: 'shirt',
      hasDropdown: true,
      subcategories: ['Formal Shirt', 'Casual Shirt', 'Denim Shirt', 'Check Shirt'],
    },
    { name: 'POLO SHIRT', slug: 'polo-shirt' },
    {
      name: 'WINTER',
      slug: 'winter',
      hasDropdown: true,
      subcategories: ['Sweater', 'Hoodie', 'Jacket', 'Cardigan'],
    },
    {
      name: 'ACCESSORIES',
      slug: 'accessories',
      hasDropdown: true,
      subcategories: ['SHOE', 'BELT', 'WALLET', 'FASHION MASK', 'SUMMER TRACKSUIT COMBO', 'BOXER', 'TROUSER'],
    },
    {
      name: 'LIFESTYLE',
      slug: 'lifestyle',
      hasDropdown: true,
      subcategories: ['Home Decor', 'Gadgets', 'Books', 'Fitness'],
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  const handleSubcategoryClick = (sub) => {
    const slug = sub.toLowerCase().replace(/\s+/g, '-');
    navigate(`/subcategory/${slug}`);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <BsNavbar bg="white" expand="md" className="shadow-sm py-2 d-none d-md-block sticky-top border-bottom" style={{ zIndex: 1040 }}>
        <Container fluid="lg" className="align-items-center">
          <Link to="/" className="navbar-brand fw-bold fs-3 d-flex align-items-center text-dark">
            <img src="/src/assets/logo/royelattire.png" alt="Logo" width={50} height={50} className="me-2" />
            RoyelAttire
          </Link>

          <Form onSubmit={handleSearch} className="d-flex align-items-center flex-grow-1 mx-4" style={{ maxWidth: 600 }}>
            <div className="input-group">
              <FormControl
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-start"
              />
              <span className="input-group-text bg-white">
                <img src={SearchIcon} alt="Search" style={{ width: 16, height: 16 }} />
              </span>
            </div>

            <div className="d-flex align-items-center ms-3 gap-3">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link to="/flash-deal" className="d-flex align-items-center gap-1 text-decoration-none text-dark">
                  <img src={FlashIcon} alt="Flash" width={36} height={36} />
                  <span className="small fw-semibold">Flash Deal</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link to="/special-offer" className="d-flex align-items-center gap-1 text-decoration-none text-dark">
                  <img src={OfferIcon} alt="Offer" width={30} height={30} />
                  <span className="small fw-semibold">Special Offer</span>
                </Link>
              </motion.div>
            </div>
          </Form>

          <Nav className="align-items-center gap-3">
            <Link to="/wishlist" className="nav-link position-relative text-dark">
              <img src={HeartIcon} alt="Wishlist" width={28} height={28} />
              {wishlistItems.length > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {wishlistItems.length}
                </Badge>
              )}
            </Link>

            <Link to="/cart" className="nav-link position-relative text-dark">
              <img src={CartIcon} alt="Cart" width={28} height={28} />
              {totalItems > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {user ? (
              <NavDropdown
                title={<img src={UserIcon} alt="User" width={22} height={22} />}
                id="user-dropdown"
                align="end"
              >
                <Link to="/orders" className="dropdown-item">My Orders</Link>
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <NavDropdown.Divider />
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </NavDropdown>
            ) : (
              <Link to="/login" className="nav-link">
                <Button variant="outline-dark" size="sm" className="rounded-pill px-3">Login</Button>
              </Link>
            )}
          </Nav>
        </Container>
      </BsNavbar>

      {/* Desktop Category Navigation */}
      <nav className="bg-info d-none d-md-block border-top shadow-sm" style={{ top: '96px', zIndex: 1030 }}>
        <Container fluid="lg">
          <Nav className="justify-content-center">
            {mainCategories.map((cat, idx) =>
              cat.hasDropdown ? (
                <NavDropdown
                  key={cat.slug}
                  title={<span className="fw-semibold text-dark">{cat.name}</span>}
                  id={`cat-dropdown-${idx}`}
                  className="px-3"
                  onMouseEnter={() => setHoveredDropdown(idx)}
                  onMouseLeave={() => setHoveredDropdown(null)}
                  show={hoveredDropdown === idx}
                >
                  {cat.subcategories.map((sub) => (
                    <NavDropdown.Item key={sub} onClick={() => handleSubcategoryClick(sub)}>
                      {sub}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="text-uppercase fw-semibold text-dark px-3"
                  style={{ cursor: 'pointer' }}
                >
                  {cat.name}
                </Nav.Link>
              )
            )}
          </Nav>
        </Container>
      </nav>

      {/* Mobile Top Bar */}
      <div className="d-md-none sticky-top bg-info shadow-sm border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
        <button
          className="btn btn-link text-dark p-0.1rem"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
          aria-label="Toggle Menu"
        >
          <i className="bi bi-list fs-2"></i>
        </button>

        <Link to="/" className="fw-bold fs-4 text-decoration-none text-dark">Royel Attire</Link>

        <Link to="/cart" className="position-relative" aria-label="Cart">
          <img src={CartIcon} alt="Cart" style={{ width: 26, height: 26 }} />
          {totalItems > 0 && (
            <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
              {totalItems}
            </Badge>
          )}
        </Link>
      </div>

      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar" aria-labelledby="mobileSidebarLabel">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" id="mobileSidebarLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body px-3">
          <ul className="list-unstyled">
            <li className="mb-3">
              <Link to="/flash-deal" className="d-flex align-items-center text-dark text-decoration-none" data-bs-dismiss="offcanvas">
                <img src={FlashIcon} alt="Flash Deal" style={{ width: 28 }} className="me-2" />
                <span className="fw-medium">Flash Deal</span>
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/special-offer" className="d-flex align-items-center text-dark text-decoration-none" data-bs-dismiss="offcanvas">
                <img src={OfferIcon} alt="Special Offer" style={{ width: 28 }} className="me-2" />
                <span className="fw-medium">Special Offer</span>
              </Link>
            </li>

            <hr />
            <li className="fw-bold text-uppercase text-muted small mb-2">Categories</li>
            {mainCategories.map((cat, idx) =>
              cat.hasDropdown ? (
                <li key={cat.slug} className="mb-2">
                  <button
                    className="btn btn-sm btn-toggle d-flex justify-content-between align-items-center w-100 text-start text-dark px-0"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${idx}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${idx}`}
                  >
                    {cat.name} <i className="bi bi-chevron-down small"></i>
                  </button>
                  <div className="collapse ps-3 mt-1" id={`collapse-${idx}`}>
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`/subcategory/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                        className="d-block small text-dark text-decoration-none mb-1"
                        data-bs-dismiss="offcanvas"
                      >
                        - {sub}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={cat.slug} className="mb-2 ps-1">
                  <Link to={`/category/${cat.slug}`} className="text-dark text-decoration-none" data-bs-dismiss="offcanvas">
                    {cat.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <nav className="d-md-none fixed-bottom bg-light border-top shadow-sm" aria-label="Mobile Navigation">
        <div className="d-flex justify-content-around align-items-center py-2">
          <Link to="/" className="text-dark text-center text-decoration-none" aria-label="Home">
            <i className="bi bi-house-door fs-5 d-block"></i><small>Home</small>
          </Link>
          <Link to="/search" className="text-dark text-center text-decoration-none" aria-label="Search">
            <i className="bi bi-search fs-5 d-block"></i><small>Search</small>
          </Link>
          <Link to="/wishlist" className="text-dark text-center text-decoration-none position-relative" aria-label="Wishlist">
            <i className="bi bi-heart fs-5 d-block"></i><small>Wishlist</small>
            {wishlistItems.length > 0 && (
              <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                {wishlistItems.length}
              </Badge>
            )}
          </Link>
          <Link to={user ? "/profile" : "/login"} className="text-dark text-center text-decoration-none" aria-label={user ? "Profile" : "Login"}>
            <i className="bi bi-person fs-5 d-block"></i><small>{user ? "Profile" : "Login"}</small>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
