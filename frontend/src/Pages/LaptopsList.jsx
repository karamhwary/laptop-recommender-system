import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLaptops } from "../services/api";
import "./LaptopsList.css";

function LaptopsList() {
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const filters = [
    { id: "all", label: "All" },
    { id: "programming", label: "💻 Programming" },
    { id: "gaming", label: "🎮 Gaming" },
    { id: "design", label: "🎨 Design" },
    { id: "video_editing", label: "🎬 Video Editing" },
  ];

  useEffect(() => {
    loadLaptops();
  }, []);

  const loadLaptops = async () => {
    try {
      const response = await getAllLaptops();
      setLaptops(response.data);
      setFilteredLaptops(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading laptops:", error);
      alert("Failed to load laptops");
      setLoading(false);
    }
  };

  const handleFilter = async (filterId) => {
    setActiveFilter(filterId);
    setLoading(true);

    try {
      if (filterId === "all") {
        const response = await getAllLaptops();
        setFilteredLaptops(response.data);
      } else {
        const response = await getAllLaptops(filterId);
        setFilteredLaptops(response.data);
      }
    } catch (error) {
      console.error("Error filtering laptops:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/laptop/${id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading laptops...</div>
      </div>
    );
  }

  return (
    <div className="laptops-container">
      <div className="laptops-content">
        {/* زر العودة إلى Home */}
        <div
          className="back-home"
          >
          <button onClick={() => navigate("/")}>← Back to Home</button>
        </div>

        <div className="laptops-header">
          <h1>💻 All Laptops</h1>
          <p>Browse all available laptops and their specifications</p>
        </div>

        <div className="filter-section">
          <div className="filter-buttons">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilter(filter.id)}
                className={`filter-button ${
                  activeFilter === filter.id
                    ? "filter-button-active"
                    : "filter-button-inactive"
                }`}>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="laptops-grid">
          {filteredLaptops.length > 0 ? (
            filteredLaptops.map((laptop) => (
              <div
                key={laptop.id}
                className="laptop-card"
                onClick={() => handleCardClick(laptop.id)}>
                <img
                  src={laptop.image_url}
                  alt={laptop.name}
                  className="laptop-card-image"
            
                />
                <div className="laptop-card-content">
                  <h3 className="laptop-card-title">{laptop.name}</h3>
                  <div className="laptop-card-brand">{laptop.brand}</div>
                  <div className="laptop-card-specs">🔧 {laptop.processor}</div>
                  <div className="laptop-card-specs">
                    💾 {laptop.ram} | 💿 {laptop.storage}
                  </div>
                  <div className="laptop-card-specs">🖥️ {laptop.gpu}</div>
                  <div className="laptop-card-price">💰 ${laptop.price}</div>
                  <div className="laptop-card-bestfor">
                    Best for: {laptop.best_for}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              No laptops found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LaptopsList;
