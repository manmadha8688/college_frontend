import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/LandingPage.css';
import { FaGraduationCap, FaChalkboard, FaBookOpen, FaUserGraduate, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: <FaGraduationCap className="feature-icon" />,
      title: "Expert Faculty",
      description: "Learn from experienced professors and industry experts"
    },
    {
      icon: <FaChalkboard className="feature-icon" />,
      title: "Modern Classrooms",
      description: "State-of-the-art learning environments"
    },
    {
      icon: <FaBookOpen className="feature-icon" />,
      title: "Comprehensive Library",
      description: "Vast collection of resources and digital materials"
    }
  ];

  const programs = [
    {
      title: "Computer Science",
      description: "Cutting-edge technology education",
      icon: <FaGraduationCap />
    },
    {
      title: "Business Administration",
      description: "Leadership and management skills",
      icon: <FaUserGraduate />
    },
    {
      title: "Engineering",
      description: "Innovation and practical skills",
      icon: <FaGraduationCap />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Empowering Future Leaders Through Excellence in Education</h1>
          <p>Join our vibrant community of learners and innovators</p>
          <div className="cta-buttons">
            <Link to="/admissions" className="btn btn-primary">Apply Now</Link>
            <Link to="/programs" className="btn btn-outline">Explore Programs</Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <p>Experience education that transforms lives</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs">
        <div className="container">
          <div className="section-header">
            <h2>Our Programs</h2>
            <p>Discover your path to success</p>
          </div>
          <div className="programs-grid">
            {programs.map((program, index) => (
              <div key={index} className="program-card">
                <div className="program-icon">
                  {program.icon}
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <Link to={`/programs/${program.title.toLowerCase().replace(/\s+/g, '-')}`} className="learn-more">
                  Learn More <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of students who have transformed their lives through education</p>
          <Link to="/apply" className="btn btn-primary">Apply Now</Link>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
};

export default LandingPage;