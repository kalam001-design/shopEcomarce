import React from "react";

import deliveryIcon from "../assets/icons/delivery.png";
import moneyIcon from "../assets/icons/money.png";
import boxIcon from "../assets/icons/box.png";
import contactMailIcon from "../assets/icons/contact-mail.png";
import loyaltyIcon from "../assets/icons/customer-experience.png";

const services = [
  {
    id: 1,
    icon: deliveryIcon,
    title: "Free Delivery",
    description: "BDT 999৳",
  },
  {
    id: 2,
    icon: moneyIcon,
    title: "Cash on Delivery",
    description: "BDT 999৳",
  },
  {
    id: 3,
    icon: boxIcon,
    title: "Free Gift Box",
    description: "& gift note",
  },
  {
    id: 4,
    icon: contactMailIcon,
    title: "Contact Us",
    description: "01723785084, 01723785084, 01723785084, 01723785084",
  },
  {
    id: 5,
    icon: loyaltyIcon,
    title: "Loyalty",
    description: "Rewarded",
  },
];

const ServiceFeatures = () => {
  return (
    <section className="service-features py-5" style={{ backgroundColor: "" }}>
      <div className="container">
        <div className="row gy-4 gx-3">
          {services.map(({ id, icon, title, description }) => (
            <div className="col-12 col-sm-6 col-md" key={id}>
              <div
                className="d-flex align-items-center h-100 p-3 border rounded bg- shadow-sm flex-column flex-sm-row text-center text-sm-start"
                style={{ minHeight: 110 }}
              >
                <img
                  src={icon}
                  alt={title}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "contain",
                    marginBottom: "0.75rem",
                    marginRight: "1rem",
                  }}
                />
                <div>
                  <h6 className="mb-1 text-uppercase fw-semibold">{title}</h6>
                  <p className="mb-0 text-muted small">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
