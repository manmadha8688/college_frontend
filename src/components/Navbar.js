// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Dropdown = ({ title, items, isMobile, isOpen, toggleDropdown }) => {
  const location = useLocation();
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
        toggleDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleDropdown]);

  return (
    <div className={`nav-item dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <button 
        className={`nav-link ${items.some(item => location.pathname === item.path) ? 'active' : ''}`}
        onClick={toggleDropdown}
      >
        {title}
        {isMobile ? (isOpen ? <FaChevronUp className="dropdown-icon" /> : <FaChevronDown className="dropdown-icon" />) : null}
      </button>
      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {items.map((item, index) => (
          <li key={index}>
            <Link 
              to={item.path} 
              className={`dropdown-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => isMobile && toggleDropdown()}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleDropdown = (name) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          {/* <img src="/logo.png" alt="College Logo" className="logo-img" /> */}
          <span style={{ color: '#2c3e50' }}>Code Pirates College</span>
        </Link>

        <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ color: '#2c3e50' }}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          
          <Dropdown
            title="About"
            items={[
              { path: '/about/college', label: 'About College' },
              { path: '/about/vision-mission', label: 'Vision & Mission' },
              { path: '/about/principals-message', label: "Principal's Message" },
              { path: '/about/accreditation', label: 'Accreditation (NAAC / AICTE / UGC)' },
              { path: '/about/management-committee', label: 'Management Committee' }
            ]}
            isMobile={isMobileMenuOpen}
            isOpen={openDropdown === 'about'}
            toggleDropdown={() => toggleDropdown('about')}
          />
          
          <Dropdown
            title="Academics"
            items={[
              { path: '/academics/departments', label: 'Departments' },
              { path: '/academics/courses', label: 'Courses Offered (UG / PG / Diploma)' },
              
              { path: '/academics/calendar', label: 'Academic Calendar' },
              { path: '/academics/faculty', label: 'Faculty List' },
              { path: '/academics/facilities', label: 'Labs & Facilities' }
            ]}
            isMobile={isMobileMenuOpen}
            isOpen={openDropdown === 'academics'}
            toggleDropdown={() => toggleDropdown('academics')}
          />
          
          <Dropdown
            title="Admissions"
            items={[
              { path: '/admissions/process', label: 'Admission Process' },
              { path: '/admissions/eligibility', label: 'Eligibility Criteria' },
              { path: '/admissions/fees', label: 'Fee Structure' },
              
              { path: '/admissions/apply', label: 'Apply Now' }
            ]}
            isMobile={isMobileMenuOpen}
            isOpen={openDropdown === 'admissions'}
            toggleDropdown={() => toggleDropdown('admissions')}
          />
          
         
          
          <li className="nav-item">
            <Link 
              to="/contact" 
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link 
                  to={user.role === 'admin' ? '/admin' : user.role === 'staff' ? '/staff' : '/student'} 
                  className="nav-link btn-primary"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button 
                  onClick={handleLogout}
                  className="nav-link btn-outline"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link 
                to="/login" 
                className="nav-link btn-primary"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;