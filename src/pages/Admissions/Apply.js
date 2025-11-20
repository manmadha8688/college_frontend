import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admissions.css';

const Apply = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    program: '',
    highestQualification: '',
    yearOfPassing: '',
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
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="admissions-container">
        <div className="success-message">
          <h2>Thank You for Your Application!</h2>
          <p>We've received your application and will review it shortly. Our admissions team will contact you within 3-5 business days with the next steps.</p>
          <Link to="/" className="btn btn-primary">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admissions-container">
      <h1>Application Form</h1>
      <p className="lead">Please fill out the form below to apply for admission to TechNova Institute of Technology.</p>
      
      <form onSubmit={handleSubmit} className="admission-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Address</h3>
          <div className="form-group">
            <label>Street Address *</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input 
                type="text" 
                name="city" 
                value={formData.city}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>State/Province *</label>
              <input 
                type="text" 
                name="state" 
                value={formData.state}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>ZIP/Postal Code *</label>
              <input 
                type="text" 
                name="zipCode" 
                value={formData.zipCode}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Academic Information</h3>
          <div className="form-group">
            <label>Program of Interest *</label>
            <select 
              name="program" 
              value={formData.program}
              onChange={handleChange}
              required
            >
              <option value="">Select a program</option>
              <option value="computer-science">B.Tech in Computer Science</option>
              <option value="mechanical">B.Tech in Mechanical Engineering</option>
              <option value="electrical">B.Tech in Electrical Engineering</option>
              <option value="civil">B.Tech in Civil Engineering</option>
              <option value="mba">Master of Business Administration (MBA)</option>
              <option value="mca">Master of Computer Applications (MCA)</option>
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Highest Qualification *</label>
              <select 
                name="highestQualification" 
                value={formData.highestQualification}
                onChange={handleChange}
                required
              >
                <option value="">Select qualification</option>
                <option value="high-school">High School</option>
                <option value="diploma">Diploma</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <div className="form-group">
              <label>Year of Passing *</label>
              <input 
                type="number" 
                name="yearOfPassing" 
                min="1950" 
                max="2025"
                value={formData.yearOfPassing}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-group">
            <label>Why do you want to join TechNova? *</label>
            <textarea 
              name="message" 
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>
              <input type="checkbox" required /> 
              I certify that the information provided is accurate to the best of my knowledge. *
            </label>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Submit Application</button>
            <Link to="/admissions" className="btn btn-secondary">Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Apply;
