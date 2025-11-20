import React from 'react';

const Accreditation = () => {
  return (
    <div className="accreditation">
      <h2>Accreditation & Recognition</h2>
      
      <div className="accreditation-intro">
        <p>
          TechNova Institute of Technology is proud to be recognized and accredited by various national 
          and international bodies, affirming our commitment to academic excellence and quality education.
        </p>
      </div>
      
      <div className="accreditation-grid">
        <div className="accreditation-card">
          <div className="accreditation-logo">
            <img src="/images/naac-logo.png" alt="NAAC" />
          </div>
          <div className="accreditation-details">
            <h3>NAAC A++ Accredited</h3>
            <p>
              Awarded the prestigious 'A++' grade by the National Assessment and Accreditation Council (NAAC) 
              with a CGPA of 3.6/4.0, placing us among the top technical institutions in the country.
            </p>
            <div className="accreditation-year">Valid Until: 2028</div>
          </div>
        </div>
        
        <div className="accreditation-card">
          <div className="accreditation-logo">
            <img src="/images/aicte-logo.png" alt="AICTE" />
          </div>
          <div className="accreditation-details">
            <h3>Approved by AICTE</h3>
            <p>
              All our programs are approved by the All India Council for Technical Education (AICTE), 
              New Delhi, ensuring that our curriculum meets national standards of technical education.
            </p>
          </div>
        </div>
        
        <div className="accreditation-card">
          <div className="accreditation-logo">
            <img src="/images/ugc-logo.png" alt="UGC" />
          </div>
          <div className="accreditation-details">
            <h3>Recognized by UGC</h3>
            <p>
              Affiliated to [University Name] and recognized by the University Grants Commission (UGC) 
              under section 2(f) and 12(B) of the UGC Act, 1956.
            </p>
          </div>
        </div>
        
        <div className="accreditation-card">
          <div className="accreditation-logo">
            <img src="/images/nba-logo.png" alt="NBA" />
          </div>
          <div className="accreditation-details">
            <h3>NBA Accredited Programs</h3>
            <p>
              Our [List of Programs] are accredited by the National Board of Accreditation (NBA), 
              signifying that they meet the highest standards of technical education.
            </p>
          </div>
        </div>
      </div>
      
      <div className="quality-policy">
        <h3>Quality Policy</h3>
        <p>
          We are committed to providing quality technical education and fostering an environment of 
          academic excellence, innovation, and research. Our quality policy focuses on:
        </p>
        <ul>
          <li>Continuous improvement in teaching-learning processes</li>
          <li>Industry-relevant curriculum and research</li>
          <li>Holistic development of students</li>
          <li>Ethical and value-based education</li>
          <li>Strong industry-academia collaboration</li>
        </ul>
      </div>
      
      <div className="awards-recognition">
        <h3>Awards & Recognitions</h3>
        <div className="awards-grid">
          <div className="award-item">
            <div className="award-icon">🏆</div>
            <h4>Best Engineering College (State Level)</h4>
            <div className="award-year">2024</div>
            <p>Awarded by [Awarding Body] for excellence in technical education and placements.</p>
          </div>
          
          <div className="award-item">
            <div className="award-icon">🌐</div>
            <h4>QS I-GAUGE Rating</h4>
            <div className="award-year">2023</div>
            <p>Diamond rating in the QS I-GAUGE Indian University Rankings.</p>
          </div>
          
          <div className="award-item">
            <div className="award-icon">🏅</div>
            <h4>Best Emerging Engineering Institute</h4>
            <div className="award-year">2022</div>
            <p>Recognized for innovation in teaching methodologies and research output.</p>
          </div>
        </div>
      </div>
      
      <div className="memberships">
        <h3>Professional Memberships</h3>
        <div className="membership-logos">
          <div className="membership-logo">
            <img src="/images/iste-logo.png" alt="ISTE" />
            <span>ISTE</span>
          </div>
          <div className="membership-logo">
            <img src="/images/ieee-logo.png" alt="IEEE" />
            <span>IEEE</span>
          </div>
          <div className="membership-logo">
            <img src="/images/csi-logo.png" alt="CSI" />
            <span>CSI</span>
          </div>
          <div className="membership-logo">
            <img src="/images/iste-logo.png" alt="IETE" />
            <span>IETE</span>
          </div>
        </div>
      </div>
      
      <div className="contact-accreditation">
        <h3>Contact for Accreditation Related Queries</h3>
        <p>
          For any queries related to accreditations, recognitions, or quality assurance, please contact:
        </p>
        <div className="contact-details">
          <p><strong>Dr. Priya Sharma</strong><br />
          Dean - Academics & Accreditation<br />
          Email: accreditation@technova.edu.in<br />
          Phone: +91-XXXXXXXXXX</p>
        </div>
      </div>
    </div>
  );
};

export default Accreditation;
