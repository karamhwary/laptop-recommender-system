import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLaptopDetails } from "../services/api";
import "./Result.css"; // نستخدم نفس تنسيق Result

function LaptopDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLaptop();
  }, [id]);

  const loadLaptop = async () => {
    try {
      const response = await getLaptopDetails(id);
      setLaptop(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading laptop details:", error);
      alert("Failed to load laptop details");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading laptop details...</div>
      </div>
    );
  }

  if (!laptop) {
    return (
      <div className="result-container">
        <div className="result-content">
          <div className="result-card">
            <div className="result-title">
              <span className="icon">❌</span>
              <h1>Laptop Not Found</h1>
            </div>
            <div className="buttons-container">
              <button
                onClick={() => navigate("/laptops")}
                className="result-button btn-primary">
                ← Back to Laptops
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
            <span className="icon">📱</span>
            <h1>{laptop.name}</h1>
          </div>

          <div className="laptop-image">
            <img
              src={laptop.image_url}
              alt={laptop.name}
            
            />
          </div>

          <div className="specs-section">
            <h3 className="specs-title">📋 Complete Specifications</h3>
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

            <div className="price">💰 Price: ${laptop.price}</div>

            <div className="details">
              <strong>📝 Description:</strong>
              <br />
              {laptop.details}
            </div>
          </div>

          <div className="buttons-container">
            <button
              onClick={() => navigate("/laptops")}
              className="result-button btn-primary">
              ← Back to All Laptops
            </button>
            <button
              onClick={() => navigate("/survey")}
              className="result-button btn-secondary">
              📝 Take Survey
            </button>
            <button
              onClick={() => navigate("/")}
              className="result-button btn-secondary">
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaptopDetails;
