import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLaptops } from "../services/api";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [laptopCount, setLaptopCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // جلب عدد اللابتوبات من قاعدة البيانات
  useEffect(() => {
    loadLaptopCount();
  }, []);

  const loadLaptopCount = async () => {
    try {
      const response = await getAllLaptops();
      setLaptopCount(response.data.length);
    } catch (error) {
      console.error("Error loading laptop count:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="hero-card">
          <div className="home-icon">💻</div>

          <h1 className="home-title">Laptop Recommender</h1>

          <p className="home-description">
            Find the perfect laptop for your needs!
          </p>

          <p className="home-subdescription">
            Answer 20 smart questions and get personalized recommendations based
            on your usage, budget, and preferences.
          </p>

          {/* مميزات الموقع */}
          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span className="feature-text">Smart Questions</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span className="feature-text">Fast Matching</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span className="feature-text">Detailed Specs</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎮</span>
              <span className="feature-text">All Use Cases</span>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="button-group">
            <button onClick={() => navigate("/survey")} className="btn-primary">
              🚀 Start Survey
            </button>
            <button
              onClick={() => navigate("/laptops")}
              className="btn-secondary">
              📋 Browse All Laptops
            </button>
          </div>

          {/* إحصائيات */}
          <div className="stats">
            <div className="stat-item">
              
              <div className="stat-number">{laptopCount}</div>

              <div className="stat-label">Laptops Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">20</div>
              <div className="stat-label">Smart Questions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4+</div>
              <div className="stat-label">Use Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
