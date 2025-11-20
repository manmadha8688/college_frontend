import React from 'react';

const VisionMission = () => {
  return (
    <div className="vision-mission">
      <div className="vision-section">
        <h2>Our Vision</h2>
        <div className="vision-content">
          <div className="vision-text">
            <p>
              To be a globally recognized institution of excellence in technical education and research, 
              nurturing innovative thinkers and leaders who will drive technological advancements and 
              contribute to sustainable development of society.
            </p>
          </div>
          <div className="vision-image">
            <img src="/images/vision.jpg" alt="Vision" />
          </div>
        </div>
      </div>
      
      <div className="mission-section">
        <h2>Our Mission</h2>
        <div className="mission-cards">
          <div className="mission-card">
            <div className="mission-icon">🎓</div>
            <h3>Academic Excellence</h3>
            <p>
              To provide quality technical education through innovative teaching-learning processes, 
              state-of-the-art infrastructure, and industry-relevant curriculum.
            </p>
          </div>
          
          <div className="mission-card">
            <div className="mission-icon">🔬</div>
            <h3>Research & Innovation</h3>
            <p>
              To foster a culture of research and innovation by promoting interdisciplinary research 
              and collaboration with industries and research organizations.
            </p>
          </div>
          
          <div className="mission-card">
            <div className="mission-icon">🌱</div>
            <h3>Holistic Development</h3>
            <p>
              To nurture students' overall personality development by inculcating ethical values, 
              leadership qualities, and social responsibility.
            </p>
          </div>
          
          <div className="mission-card">
            <div className="mission-icon">🤝</div>
            <h3>Industry Collaboration</h3>
            <p>
              To establish strong industry-academia partnerships for knowledge sharing, skill development, 
              and creating employable professionals.
            </p>
          </div>
        </div>
      </div>
      
      <div className="core-values">
        <h2>Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h4>Excellence</h4>
            <p>Striving for the highest standards in all our endeavors</p>
          </div>
          <div className="value-item">
            <h4>Integrity</h4>
            <p>Upholding ethical standards and academic integrity</p>
          </div>
          <div className="value-item">
            <h4>Innovation</h4>
            <p>Encouraging creativity and out-of-the-box thinking</p>
          </div>
          <div className="value-item">
            <h4>Inclusivity</h4>
            <p>Valuing diversity and fostering an inclusive environment</p>
          </div>
          <div className="value-item">
            <h4>Sustainability</h4>
            <p>Promoting sustainable practices and social responsibility</p>
          </div>
          <div className="value-item">
            <h4>Collaboration</h4>
            <p>Working together for shared success and growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
