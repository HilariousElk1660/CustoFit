import { Link } from "react-router-dom";
import "./Featured.css";

function Featured() {
  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="featured-header">
          <span className="featured-badge">Popular Items</span>
          <h2 className="featured-title">Start With These Favorites</h2>
          <p className="featured-subtitle">
            Our most popular items ready for your custom touch. Each piece is
            carefully crafted with premium materials and attention to detail.
          </p>
        </div>

        <div className="featured-grid">
          {/* Hoodie */}
          <div className="featured-card">
            <div className="featured-image-wrapper">
              <span className="featured-popular-badge">Bestseller</span>
              <img
                src="//cdn.pacdora.com/image-resize/650xauto_outside/render/cover/11029448_967dbeda-aa76-49b9-997c-6786db8b674d.jpg"
                alt="Custom Hoodie"
                className="featured-image"
              />
              <div className="featured-image-overlay"></div>
            </div>
            <div className="featured-card-content">
              <div className="featured-card-header">
                <h3 className="featured-product-name">Boxy Hoodie</h3>
                <span className="featured-product-price">R 400</span>
              </div>
              <div className="featured-rating">
                <svg className="featured-star-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="featured-rating-value">4.8</span>
                <span className="featured-review-count">(212)</span>
              </div>
              <Link to="/studio" className="featured-customize-button">
                Customise Now
                <svg className="featured-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* T-Shirt */}
          <div className="featured-card">
            <div className="featured-image-wrapper">
              <span className="featured-popular-badge">Classic</span>
              <img
                src="//cdn.pacdora.com/image-resize/650xauto_outside/render/1733913856771/11329195.jpg"
                alt="Custom T-Shirt"
                className="featured-image"
              />
              <div className="featured-image-overlay"></div>
            </div>
            <div className="featured-card-content">
              <div className="featured-card-header">
                <h3 className="featured-product-name">T-Shirt</h3>
                <span className="featured-product-price">R 320</span>
              </div>
              <div className="featured-rating">
                <svg className="featured-star-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="featured-rating-value">4.6</span>
                <span className="featured-review-count">(89)</span>
              </div>
              <Link to="/studio" className="featured-customize-button">
                Customise Now
                <svg className="featured-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Bucket Hat */}
          <div className="featured-card">
            <div className="featured-image-wrapper">
              <span className="featured-popular-badge">Summer Essential</span>
              <img
                src="//cdn.pacdora.com/image-resize/650xauto_outside/render/cover/11188705_13d8fced-f91f-4e34-81ed-7824369cecfb.jpg"
                alt="Custom Bucket Hat"
                className="featured-image"
              />
              <div className="featured-image-overlay"></div>
            </div>
            <div className="featured-card-content">
              <div className="featured-card-header">
                <h3 className="featured-product-name">Bucket Hat</h3>
                <span className="featured-product-price">R 180</span>
              </div>
              <div className="featured-rating">
                <svg className="featured-star-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="featured-rating-value">4.7</span>
                <span className="featured-review-count">(154)</span>
              </div>
              <Link to="/studio" className="featured-customize-button">
                Customise Now
                <svg className="featured-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Polo Shirt */}
          <div className="featured-card">
            <div className="featured-image-wrapper">
              <span className="featured-popular-badge">Popular</span>
              <img
                src="//cdn.pacdora.com/image-resize/650xauto_outside/render/1734422194946/11358688.jpg"
                alt="Custom Polo Shirt"
                className="featured-image"
              />
              <div className="featured-image-overlay"></div>
            </div>
            <div className="featured-card-content">
              <div className="featured-card-header">
                <h3 className="featured-product-name">Polo Shirt</h3>
                <span className="featured-product-price">R 380</span>
              </div>
              <div className="featured-rating">
                <svg className="featured-star-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="featured-rating-value">4.5</span>
                <span className="featured-review-count">(67)</span>
              </div>
              <Link to="/studio" className="featured-customize-button">
                Customise Now
                <svg className="featured-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="featured-footer">
          <Link to="/products" className="featured-view-all-button">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Featured;