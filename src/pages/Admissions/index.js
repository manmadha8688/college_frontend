import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/Admissions.css';

const Admissions = () => {
  return (
    <div className="admissions-page">
      <div className="admissions-hero">
        <div className="container">
          <h1>Admissions</h1>
          <p>Begin your journey with TechNova Institute of Technology</p>
        </div>
      </div>
      
      <div className="admissions-content">
        <div className="container">
          
          
          <div className="admissions-main">
            <Outlet />
          </div>
        </div>
      </div>
      
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Begin Your Journey?</h2>
          <p>Join TechNova and be part of an innovative learning community.</p>
          <Link to="/admissions/apply" className="btn btn-primary">Apply Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
