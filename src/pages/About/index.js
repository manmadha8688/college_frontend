import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>About TechNova</h1>
          <p>Excellence in Technical Education Since 2005</p>
        </div>
      </div>
      
      <div className="about-content">
        <div className="container">
          
          
          <div className="about-main">
            <Outlet />
          </div>
        </div>
      </div>
      
      <section className="quick-facts">
        <div className="container">
          <h2>Quick Facts</h2>
          <div className="facts-grid">
            <div className="fact-card">
              <div className="fact-number">18+</div>
              <div className="fact-title">Years of Excellence</div>
            </div>
            <div className="fact-card">
              <div className="fact-number">5000+</div>
              <div className="fact-title">Alumni</div>
            </div>
            <div className="fact-card">
              <div className="fact-number">200+</div>
              <div className="fact-title">Expert Faculty</div>
            </div>
            <div className="fact-card">
              <div className="fact-number">50+</div>
              <div className="fact-title">Acres Campus</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="campus-tour">
        <div className="container">
          <div className="tour-content">
            <h2>Virtual Campus Tour</h2>
            <p>Explore our state-of-the-art facilities from the comfort of your home.</p>
            <button className="btn btn-primary">Take a Virtual Tour</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
