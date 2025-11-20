import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <div className="contact-hero">
          <div className="container">
            <h1>Thank You!</h1>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
            <Link to="/" className="btn btn-primary">Return to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out to us with any questions or feedback.</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
            
            <div className="contact-info">
              <div className="contact-card">
                <h3>Get in Touch</h3>
                <p>Have questions or feedback? We're here to help!</p>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Address</h4>
                    <p>123 Education Street<br />Tech City, TC 12345<br />India</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 98765 43210 (Admissions)<br />+91 98765 43211 (General)</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>admissions@technova.edu.in<br />info@technova.edu.in</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4>Working Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
                
                <div className="social-links">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
              
              <div className="map-container">
                <iframe 
                  title="College Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001036583331!2d77.49301531534462!3d12.97197299085646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d8ad8a7ec85%3A0x1f3255777db7d6f8!2sBangalore%20Palace!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="300" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>What are the admission requirements?</h3>
                <p>Admission requirements vary by program. Please visit our <Link to="/admissions/eligibility">Admissions Eligibility</Link> page for detailed information.</p>
              </div>
              <div className="faq-item">
                <h3>How can I schedule a campus tour?</h3>
                <p>You can schedule a campus tour by calling our admissions office at +91 98765 43210 or by emailing visit@technova.edu.in.</p>
              </div>
              <div className="faq-item">
                <h3>What programs do you offer?</h3>
                <p>We offer a variety of undergraduate and postgraduate programs in engineering, computer applications, and business administration. Visit our <Link to="/academics/courses">Courses</Link> page for details.</p>
              </div>
              <div className="faq-item">
                <h3>Do you offer financial aid?</h3>
                <p>Yes, we offer various scholarships and financial aid options. Please contact our financial aid office at financialaid@technova.edu.in for more information.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
