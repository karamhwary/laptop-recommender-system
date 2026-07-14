import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Result.css";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const laptop = location.state?.recommendedLaptop;

  if (!laptop) {
    return (
      <div className="result-container">
        <div className="result-content">
          <div className="result-card">
            <div className="result-title">
              <span className="icon">⚠️</span>
              <h1>No Recommendation Found</h1>
            </div>
            <p style={{ textAlign: "center", margin: "20px 0" }}>
              Please complete the survey first to get a recommendation.
            </p>
            <div className="buttons-container">
              <button
                onClick={() => navigate("/survey")}
                className="result-button btn-primary">
                📝 Go to Survey
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="result-container">
      <div className="result-content">
        <div className="result-card">
          <div className="result-title">
            <h1>Your Recommended Laptop</h1>
          </div>

          <h2 className="laptop-name">{laptop.name}</h2>

          <div className="laptop-image">
            <img
              src={laptop.image_url }
              alt={laptop.name}
          
            />
          </div>

          <div className="specs-section">
            <h3 className="specs-title">📋 Full Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Brand:</span>
                <span className="spec-value">{laptop.brand}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Processor:</span>
                <span className="spec-value">{laptop.processor}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">RAM:</span>
                <span className="spec-value">{laptop.ram}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Storage:</span>
                <span className="spec-value">{laptop.storage}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Graphics Card:</span>
                <span className="spec-value">{laptop.gpu}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Screen Size:</span>
                <span className="spec-value">{laptop.screen_size}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Resolution:</span>
                <span className="spec-value">{laptop.resolution}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Best For:</span>
                <span className="spec-value">
                  {laptop.best_for}
                </span>
              </div>
            </div>

            <div className="price"> Price: ${laptop.price}</div>

            <div className="details">
              <strong>📝 Details:</strong>
              <br />
              {laptop.details}
            </div>
          </div>

          <div className="buttons-container">
            <button
              onClick={() => navigate("/survey")}
              className="result-button btn-primary">
              📝 Take Survey Again
            </button>
            <button
              onClick={() => navigate("/laptops")}
              className="result-button btn-secondary">
              💻 View All Laptops
            </button>
            <button
              onClick={() => navigate("/")}
              className="result-button btn-secondary">
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
