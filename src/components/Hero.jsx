import React from 'react';
import { Carousel, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Hero = () => {
  const slides = [
    {
      id: 1,
      image: '/assets/banner/banner1.webp',
      title: 'Unleash Your Style',
      description: 'Explore new arrivals for PANJABI, SHIRTS, T-SHIRTS, and more.',
      buttonText: 'Shop Now',
      link: '/shop',
    },
    {
      id: 2,
      image: '/assets/banner/banner2.webp',
      title: 'Feel the Comfort',
      description: 'Crafted for confidence. Wear Royel Attire.',
      buttonText: 'Discover',
      link: '/new',
    },
    {
      id: 3,
      image: '/assets/banner/banner1.webp',
      title: 'Winter Collection',
      description: 'Cozy, warm & fashionable. Limited Time Offers!',
      buttonText: 'Winter Wear',
      link: '/category/winter',
    },
  ];

  return (
    <>
      <style>{`
        .hero-slide {
          position: relative;
          height: 60vh;
          min-height: 300px;
          max-height: 600px;
          overflow: hidden;
        }

        .hero-img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          max-height: 600px;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: rgba(0,0,0,0.4);
          z-index: 1;
        }

        .carousel-caption {
          z-index: 2;
          bottom: 15%;
          left: 5%;
          right: 5%;
          text-align: left;
          max-width: 600px;
        }

        .text-shadow {
          text-shadow:
            0 0 5px rgba(0, 0, 0, 0.7),
            0 0 10px rgba(0, 0, 0, 0.7),
            0 0 15px rgba(0, 0, 0, 0.7);
        }

        @media (max-width: 767px) {
          .hero-slide {
            height: 40vh;
            min-height: 200px;
          }

          .hero-img {
            max-height: 400px;
          }

          .carousel-caption {
            bottom: 10%;
            left: 2%;
            right: 2%;
            max-width: 100%;
            padding: 0 10px;
          }

          .carousel-caption h1 {
            font-size: 1.5rem !important;
            font-weight: 700;
          }

          .carousel-caption p {
            font-size: 0.9rem !important;
          }

          .carousel-caption a.btn {
            font-size: 0.9rem;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>

      <Carousel controls indicators interval={4000} pause="hover" fade>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div className="hero-slide">
              <img
                className="d-block w-100 hero-img"
                src={slide.image}
                alt={slide.title}
              />
              <div className="overlay" />
              <Carousel.Caption>
                <Container>
                  <h1 className="display-5 fw-bold text-white text-shadow">{slide.title}</h1>
                  <p className="lead text-light text-shadow">{slide.description}</p>
                  <Link to={slide.link}>
                    <Button variant="light" className="fw-semibold rounded-pill mt-2">
                      {slide.buttonText}
                    </Button>
                  </Link>
                </Container>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default Hero;
